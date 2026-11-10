import type { Config } from "@netlify/functions";
import { COOKIE, credsOk, makeToken } from "../lib/auth.ts";

const page = (to: string) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${to}"><title>Signing in</title></head><body style="font-family:system-ui;padding:24px"><a href="${to}">Continue</a></body></html>`;

export default async (req: Request) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });

  const secret = Netlify.env.get("SESSION_SECRET");
  const expectedUser = Netlify.env.get("DASH_USER");
  const expectedPass = Netlify.env.get("DASH_PASS");
  if (!secret || !expectedUser || !expectedPass) {
    return new Response("Dashboard is not configured.", { status: 503 });
  }

  // Same-origin only.
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).hostname !== new URL(req.url).hostname) return new Response(null, { status: 403 });
    } catch {
      return new Response(null, { status: 403 });
    }
  }

  let user = "";
  let pass = "";
  try {
    const form = await req.formData();
    user = String(form.get("user") ?? "").slice(0, 200);
    pass = String(form.get("pass") ?? "").slice(0, 200);
  } catch {
    /* fall through as a failed login */
  }

  const wantsJson = req.headers.get("x-login") === "1";
  const ok = await credsOk(secret, user, pass, expectedUser, expectedPass);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    if (wantsJson) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 401,
        headers: { "content-type": "application/json", "cache-control": "no-store" },
      });
    }
    return new Response(page("/visits/?e=1"), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  }

  const token = await makeToken(secret);
  if (wantsJson) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": `${COOKIE}=${token}; Path=/; Max-Age=${14 * 86400}; HttpOnly; Secure; SameSite=Strict`,
        "cache-control": "no-store",
      },
    });
  }
  return new Response(page("/visits/"), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "set-cookie": `${COOKIE}=${token}; Path=/; Max-Age=${14 * 86400}; HttpOnly; Secure; SameSite=Strict`,
      "cache-control": "no-store",
    },
  });
};

export const config: Config = {
  path: "/api/login",
  method: "POST",
  rateLimit: { action: "rate_limit", aggregateBy: ["ip", "domain"], windowSize: 60, windowLimit: 10 },
};
