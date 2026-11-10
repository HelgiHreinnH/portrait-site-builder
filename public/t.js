/* Anonymous first-party visit counter for helgi.dk.
   No cookies, no IP stored, respects Do Not Track. */
(function () {
  "use strict";
  try { if (localStorage.getItem("ht_ignore") === "1") return; } catch (e) {}
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
  if (location.pathname.indexOf("/visits") === 0) return;

  var KEY = "ht_c";
  var lastPath = null;

  function campaign() {
    var c = "";
    try {
      c = (new URLSearchParams(location.search).get("c") || "")
        .toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
    } catch (e) {}
    try {
      if (c) sessionStorage.setItem(KEY, c);
      else c = sessionStorage.getItem(KEY) || "";
    } catch (e) {}
    return c;
  }

  function referrerHost() {
    try {
      if (!document.referrer) return "";
      var h = new URL(document.referrer).hostname.replace(/^www\./, "");
      return h === location.hostname.replace(/^www\./, "") ? "" : h;
    } catch (e) { return ""; }
  }

  function send(type, extra) {
    var body = { type: type, path: location.pathname, c: campaign() };
    if (extra) for (var k in extra) body[k] = extra[k];
    var json = JSON.stringify(body);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon("/api/track", new Blob([json], { type: "text/plain" }))) return;
    } catch (e) {}
    try {
      fetch("/api/track", { method: "POST", body: json, keepalive: true, headers: { "content-type": "text/plain" } });
    } catch (e) {}
  }

  function view(first) {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    send("view", first ? { ref: referrerHost() } : null);
  }

  // Page views, including client-side route changes.
  ["pushState", "replaceState"].forEach(function (fn) {
    var orig = history[fn];
    history[fn] = function () {
      var r = orig.apply(this, arguments);
      setTimeout(function () { view(false); }, 0);
      return r;
    };
  });
  window.addEventListener("popstate", function () { view(false); });
  view(true);

  // CV opens (the site opens /cv.pdf with window.open).
  var open = window.open;
  window.open = function (u) {
    try { if (String(u).indexOf("cv.pdf") > -1) send("cv"); } catch (e) {}
    return open.apply(this, arguments);
  };

  // CV links and outbound clicks.
  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
    if (!a) return;
    try {
      var u = new URL(a.href, location.href);
      if (u.pathname.indexOf("cv.pdf") > -1) return send("cv");
      if (u.hostname !== location.hostname) {
        var h = u.hostname.replace(/^www\./, "");
        send("out", { target: /linkedin\.com$/.test(h) ? "linkedin" : /github\.com$/.test(h) ? "github" : h });
      }
    } catch (e) {}
  }, true);
})();
