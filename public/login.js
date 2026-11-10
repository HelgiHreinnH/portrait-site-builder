// Sign-in without a page navigation: post in the background, then go to the dashboard.
(function () {
  var form = document.querySelector("form");
  if (!form || !window.fetch) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = form.querySelector("button");
    if (btn) { btn.disabled = true; btn.textContent = "Signing in..."; }
    fetch("/api/login", {
      method: "POST",
      body: new FormData(form),
      headers: { "x-login": "1" },
      credentials: "same-origin",
      cache: "no-store"
    }).then(function (r) {
      if (r.ok) { location.replace("/visits/"); return; }
      location.replace("/visits/?e=1");
    }).catch(function () {
      location.replace("/visits/?e=1");
    });
  });
})();
