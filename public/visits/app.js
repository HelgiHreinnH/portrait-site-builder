(function () {
  "use strict";

  // Keep this browser out of the counts.
  try { localStorage.setItem("ht_ignore", "1"); } catch (e) {}

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var NS = "http://www.w3.org/2000/svg";
  var nf = new Intl.NumberFormat("en-GB");
  var state = { days: 30, data: null, table: false, loadedAt: 0 };
  var tip = $("#tip");

  /* ---------- helpers ---------- */
  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function s(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function fmtDay(d, long) {
    var p = d.split("-");
    var dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: long ? "numeric" : undefined, timeZone: "UTC" });
  }
  function niceMax(v) {
    if (v <= 4) return 4;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }
  function ago(t) {
    var d = new Date(t);
    var now = new Date();
    var time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Copenhagen" });
    var dayOf = function (x) { return x.toLocaleDateString("en-CA", { timeZone: "Europe/Copenhagen" }); };
    if (dayOf(d) === dayOf(now)) return "Today " + time;
    if (dayOf(d) === dayOf(new Date(now - 864e5))) return "Yesterday " + time;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Copenhagen" }) + " " + time;
  }
  function place(e) {
    var parts = [];
    if (e.city) parts.push(e.city);
    if (e.country) parts.push(e.country);
    return parts.join(", ") || "Unknown place";
  }
  function showTip(html, x, y) {
    clear(tip);
    html.forEach(function (n) { tip.appendChild(n); });
    tip.hidden = false;
    var w = tip.offsetWidth, hgt = tip.offsetHeight;
    var left = Math.min(Math.max(8, x + 14), window.innerWidth - w - 8);
    var top = y - hgt - 14 < 8 ? y + 18 : y - hgt - 14;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.hidden = true; }

  /* ---------- chart ---------- */
  function drawChart(series) {
    var root = $("#chart");
    clear(root);
    var W = root.clientWidth || 800, H = root.clientHeight || 260;
    var m = { l: 34, r: 0, t: 8, b: 26 };
    var pw = W - m.l - m.r, ph = H - m.t - m.b;
    var max = niceMax(Math.max.apply(null, series.map(function (d) { return d.views; }).concat([1])));
    var svg = s("svg", { viewBox: "0 0 " + W + " " + H, preserveAspectRatio: "none" });
    svg.setAttribute("aria-hidden", "true");

    var grid = s("g", { class: "grid" }), axis = s("g", { class: "axis" });
    [0, 0.5, 1].forEach(function (f) {
      var y = m.t + ph - ph * f;
      if (f > 0) grid.appendChild(s("line", { x1: m.l, x2: W, y1: y, y2: y }));
      var t = s("text", { x: m.l - 8, y: y + 3, "text-anchor": "end" });
      t.textContent = Math.round(max * f);
      axis.appendChild(t);
    });
    svg.appendChild(grid);

    var n = series.length, slot = pw / n, bw = Math.max(2, slot - (slot > 8 ? 3 : 1));
    var step = Math.ceil(n / (W < 520 ? 4 : 7));
    var bars = s("g", {}), hits = s("g", {});
    series.forEach(function (d, i) {
      var x = m.l + i * slot + (slot - bw) / 2;
      var hv = (d.views / max) * ph, hu = (d.visitors / max) * ph;
      if (d.views > 0) {
        bars.appendChild(s("rect", { class: "bar-v rise", x: x, y: m.t + ph - hv, width: bw, height: hv, style: "animation-delay:" + Math.min(i * 8, 400) + "ms" }));
        bars.appendChild(s("rect", { class: "bar-u rise", x: x, y: m.t + ph - hu, width: bw, height: hu, style: "animation-delay:" + Math.min(i * 8, 400) + "ms" }));
      }
      if (i % step === 0 || i === n - 1 && n - 1 - (Math.floor((n - 1) / step) * step) >= step / 2) {
        var t = s("text", { x: x + bw / 2, y: H - 6, "text-anchor": "middle" });
        t.textContent = fmtDay(d.day);
        axis.appendChild(t);
      }
      var hit = s("rect", { class: "hit", x: m.l + i * slot, y: m.t, width: slot, height: ph });
      var show = function (ev) {
        var p = ev.touches ? ev.touches[0] : ev;
        showTip([
          h("div", { class: "t-day", text: fmtDay(d.day, true) }),
          h("div", { class: "t-row" }, [h("span", { text: "Views" }), h("b", { text: nf.format(d.views) })]),
          h("div", { class: "t-row" }, [h("span", { text: "Visitors" }), h("b", { text: nf.format(d.visitors) })])
        ], p.clientX, p.clientY);
      };
      hit.addEventListener("mousemove", show);
      hit.addEventListener("touchstart", show, { passive: true });
      hit.addEventListener("mouseleave", hideTip);
      hits.appendChild(hit);
    });
    svg.appendChild(bars);
    svg.appendChild(s("line", { class: "base", x1: m.l, x2: W, y1: m.t + ph, y2: m.t + ph }));
    svg.appendChild(axis);
    svg.appendChild(hits);
    root.appendChild(svg);
  }

  function drawTable(series) {
    var box = $("#chart-table");
    clear(box);
    var rows = series.slice().reverse().map(function (d) {
      return h("tr", null, [h("td", { text: fmtDay(d.day, true) }), h("td", { class: "num", text: nf.format(d.views) }), h("td", { class: "num", text: nf.format(d.visitors) })]);
    });
    box.appendChild(h("table", null, [
      h("thead", null, [h("tr", null, [h("th", { text: "Day" }), h("th", { class: "num", text: "Views" }), h("th", { class: "num", text: "Visitors" })])]),
      h("tbody", null, rows)
    ]));
  }

  /* ---------- lists ---------- */
  function rows(host, items, cfg) {
    clear(host);
    if (!items.length) { host.appendChild(h("p", { class: "empty", text: cfg.empty })); return; }
    var max = Math.max.apply(null, items.map(cfg.value).concat([1]));
    var ul = h("ul", { class: "rows" });
    items.forEach(function (it) {
      var v = cfg.value(it);
      var name = h("span", { class: "row-name" }, [cfg.code ? h("span", { class: "row-code", text: cfg.code(it) }) : null, cfg.label(it)]);
      ul.appendChild(h("li", { class: "row" }, [
        h("div", { class: "row-top" }, [name, h("span", { class: "row-n", text: nf.format(v) })]),
        h("div", { class: "meter" }, [h("i", { style: "width:" + Math.max(2, (v / max) * 100) + "%" })])
      ]));
    });
    host.appendChild(ul);
  }

  function renderLinks(list) {
    var host = $("#links");
    clear(host);
    if (!list.length) {
      host.appendChild(h("p", { class: "empty", text: "No named links used yet. Make one below and send it to someone." }));
      return;
    }
    var body = list.map(function (c) {
      return h("tr", null, [
        h("td", null, [h("span", { class: "tag", text: c.c })]),
        h("td", { class: "num", text: nf.format(c.visitors) }),
        h("td", { class: "num", text: nf.format(c.views) }),
        h("td", { class: "num" }, [c.cv ? h("span", { class: "tag cv", text: "CV x" + c.cv }) : h("span", { class: "row-sub", text: "-" })]),
        h("td", { class: "mono", text: ago(c.last) })
      ]);
    });
    host.appendChild(h("div", { class: "table-scroll" }, [h("table", null, [
      h("thead", null, [h("tr", null, [h("th", { text: "Link" }), h("th", { class: "num", text: "Visitors" }), h("th", { class: "num", text: "Views" }), h("th", { class: "num", text: "CV" }), h("th", { text: "Last seen" })])]),
      h("tbody", null, body)
    ])]));
  }

  function renderRecent(list) {
    var host = $("#recent");
    clear(host);
    if (!list.length) { host.appendChild(h("p", { class: "empty", text: "Nothing yet. New visits appear here within seconds." })); return; }
    var body = list.slice(0, 25).map(function (e) {
      var what = e.type === "cv" ? "Opened the CV"
        : e.type === "out" ? "Clicked " + (e.target || "a link")
        : "Viewed " + (e.path || "/");
      var who = [h("span", { text: place(e) })];
      if (e.c) who.push(" ", h("span", { class: "tag", text: e.c }));
      return h("tr", null, [
        h("td", { class: "mono", text: ago(e.t) }),
        h("td", null, [e.type === "cv" ? h("span", { class: "tag cv", text: what }) : what]),
        h("td", null, who),
        h("td", { class: "mono", text: e.device + (e.ref ? " / " + e.ref : "") })
      ]);
    });
    host.appendChild(h("table", null, [
      h("thead", null, [h("tr", null, [h("th", { text: "When" }), h("th", { text: "What" }), h("th", { text: "From" }), h("th", { text: "Device / source" })])]),
      h("tbody", null, body)
    ]));
  }

  /* ---------- render ---------- */
  function render() {
    var d = state.data;
    if (!d) return;
    var t = d.totals;
    $("#numeral").textContent = nf.format(t.views);
    $("#hero-range").textContent = "last " + d.days + " days";
    var sub = $("#hero-sub");
    clear(sub);
    if (t.views === 0) {
      sub.textContent = "No visits recorded yet. Counting started when this dashboard went live, so numbers appear as people open the site.";
    } else {
      sub.appendChild(h("b", { text: nf.format(t.visitors) + (t.visitors === 1 ? " visitor" : " visitors") }));
      sub.appendChild(document.createTextNode(" from " + t.countries + (t.countries === 1 ? " country" : " countries") + (t.cities ? " and " + t.cities + (t.cities === 1 ? " city" : " cities") : "") + (d.capped ? " (showing the latest " + nf.format(6000) + " events)" : "") + "."));
    }
    $("#k-visitors").textContent = nf.format(t.visitors);
    $("#k-cv").textContent = nf.format(t.cv);
    $("#k-countries").textContent = nf.format(t.countries);
    $("#k-links").textContent = nf.format(d.campaigns.length);

    drawChart(d.series);
    drawTable(d.series);

    rows($("#countries"), d.countries, { value: function (r) { return r.visitors; }, code: function (r) { return r.code === "??" ? "--" : r.code; }, label: function (r) { return r.name; }, empty: "No countries yet." });
    rows($("#cities"), d.cities, { value: function (r) { return r.visitors; }, code: function (r) { return r.code || "--"; }, label: function (r) { return r.city; }, empty: "No cities yet. City is only shown when it can be worked out." });
    rows($("#sources"), d.referrers, { value: function (r) { return r.visitors; }, label: function (r) { return r.ref; }, empty: "No sources yet." });
    rows($("#pages"), d.pages, { value: function (r) { return r.views; }, label: function (r) { return r.path; }, empty: "No pages yet." });
    rows($("#devices"), d.devices, { value: function (r) { return r.visitors; }, label: function (r) { return r.device.charAt(0).toUpperCase() + r.device.slice(1); }, empty: "No devices yet." });

    var acts = [{ name: "Opened the CV", n: t.cv }].concat(d.outbound.map(function (o) { return { name: "Clicked " + o.target, n: o.count }; })).filter(function (a) { return a.n > 0; });
    rows($("#actions"), acts, { value: function (a) { return a.n; }, label: function (a) { return a.name; }, empty: "No CV opens or link clicks yet." });

    renderLinks(d.campaigns);
    renderRecent(d.recent);
  }

  function load() {
    var sub = $("#hero-sub");
    fetch("/api/stats?days=" + state.days, { credentials: "same-origin", cache: "no-store" })
      .then(function (r) {
        if (r.status === 401) { location.reload(); throw new Error("signed out"); }
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (d) {
        state.data = d;
        state.loadedAt = Date.now();
        $("#updated").textContent = "Updated " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Copenhagen" });
        render();
      })
      .catch(function (err) {
        if (err.message === "signed out") return;
        sub.textContent = "Could not load the numbers (" + err.message + "). Reload the page to try again.";
      });
  }

  /* ---------- controls ---------- */
  $("#range").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-days]");
    if (!b) return;
    state.days = +b.getAttribute("data-days");
    Array.prototype.forEach.call(this.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    load();
  });

  $("#toggle-table").addEventListener("click", function () {
    state.table = !state.table;
    this.setAttribute("aria-pressed", String(state.table));
    this.textContent = state.table ? "Show as chart" : "Show as table";
    $("#chart").hidden = state.table;
    $("#chart-table").hidden = !state.table;
    if (!state.table && state.data) drawChart(state.data.series);
  });

  $("#mk").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var input = $("#mk-name"), hint = $("#mk-hint");
    var name = input.value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "");
    if (!name) { hint.className = "hint bad"; hint.textContent = "Type a name first, for example the company."; return; }
    var link = "https://helgi.dk/?c=" + name;
    var done = function () { hint.className = "hint ok"; hint.textContent = "Copied " + link; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, function () { hint.className = "hint"; hint.textContent = link; });
    else { hint.className = "hint"; hint.textContent = link; }
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (state.data && !state.table) drawChart(state.data.series); }, 150);
  });
  window.addEventListener("scroll", hideTip, { passive: true });

  $("#refresh").addEventListener("click", load);

  // Refresh once an hour, and when the tab comes back after being away that long.
  var HOUR = 3600000;
  load();
  setInterval(function () { if (!document.hidden) load(); }, HOUR);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && Date.now() - state.loadedAt > HOUR) load();
  });
})();
