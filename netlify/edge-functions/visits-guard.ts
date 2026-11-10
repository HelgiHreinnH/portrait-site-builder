import type { Config, Context } from "@netlify/edge-functions";
import { COOKIE, checkToken, readCookie } from "../lib/auth.ts";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap";

function loginPage(error: boolean): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Visits - sign in</title>
<link rel="stylesheet" href="${FONTS}">
<style>
  :root { --ink:#141d2e; --muted:#6a7181; --hair:#ebebeb; --accent:#335cff; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body { background:#fff; color:var(--ink); font-family:"Space Grotesk",system-ui,sans-serif; display:grid; place-items:center; padding:24px; }
  main { width:100%; max-width:380px; }
  .mono { font-family:"Space Mono",ui-monospace,monospace; font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:var(--muted); }
  h1 { font-size:clamp(2.6rem,9vw,3.6rem); line-height:1; letter-spacing:-.04em; margin:14px 0 40px; font-weight:700; }
  label { display:block; font-family:"Space Mono",ui-monospace,monospace; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); margin:0 0 8px; }
  input { width:100%; font:inherit; font-size:16px; color:var(--ink); background:#fff; border:1px solid var(--hair); border-radius:0; padding:14px 14px; margin:0 0 22px; }
  input:focus { outline:2px solid var(--accent); outline-offset:1px; border-color:var(--ink); }
  button { width:100%; font-family:"Space Mono",ui-monospace,monospace; font-size:12px; letter-spacing:.25em; text-transform:uppercase; color:#fff; background:var(--ink); border:1px solid var(--ink); border-radius:0; padding:16px; cursor:pointer; }
  button:hover { background:#000; }
  button:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
  .err { border-left:2px solid #c0392b; padding:2px 0 2px 12px; margin:0 0 24px; font-size:14px; color:#8a2a1f; }
</style>
</head>
<body>
<main>
  <div class="mono">Helgi Hreinn</div>
  <h1>Visits</h1>
  ${error ? '<p class="err" role="alert">Wrong username or password.</p>' : ""}
  <form method="post" action="/api/login" autocomplete="on">
    <label for="user">Username</label>
    <input id="user" name="user" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required autofocus>
    <label for="pass">Password</label>
    <input id="pass" name="pass" type="password" autocomplete="current-password" required>
    <button type="submit">Sign in</button>
  </form>
  <script src="/login.js" defer></script>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      "referrer-policy": "no-referrer",
    },
  });
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const secret = Netlify.env.get("SESSION_SECRET");
  if (!secret) return new Response("Dashboard is not configured.", { status: 503 });

  if (url.pathname === "/visits/logout") {
    return new Response(null, {
      status: 303,
      headers: {
        location: "/visits/",
        "set-cookie": `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`,
        "cache-control": "no-store",
      },
    });
  }

  const authed = await checkToken(secret, readCookie(req.headers.get("cookie"), COOKIE));
  if (!authed) return loginPage(url.searchParams.has("e"));

  if (url.pathname === "/visits") return Response.redirect(new URL("/visits/", url), 302);

  const res = await context.next();
  const headers = new Headers(res.headers);
  headers.set("cache-control", "no-store");
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(res.body, { status: res.status, headers });
};

export const config: Config = {
  path: ["/visits", "/visits/*"],
  onError: "fail",
};
