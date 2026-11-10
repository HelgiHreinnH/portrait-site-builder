import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { cphDay, sha256Hex } from "../lib/auth.ts";

// Anonymous, first-party visit tracking. Stores no IP address and sets no cookie.
// "vid" is a one-way hash that changes every day, so it counts unique visitors
// per day but cannot follow anyone across days.

const BOT =
  /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|httpclient|go-http|java\/|node-fetch|axios/i;

const device = (ua: string) =>
  /ipad|tablet/i.test(ua) ? "tablet" : /mobi|android|iphone/i.test(ua) ? "mobile" : "desktop";

const browser = (ua: string) =>
  /edg\//i.test(ua) ? "Edge"
  : /opr\/|opera/i.test(ua) ? "Opera"
  : /firefox|fxios/i.test(ua) ? "Firefox"
  : /chrome|crios/i.test(ua) ? "Chrome"
  : /safari/i.test(ua) ? "Safari"
  : "Other";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f<>"'`]/g, "").trim().slice(0, max) : "";

const none = () => new Response(null, { status: 204, headers: { "cache-control": "no-store" } });

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });

  // Only accept beacons from the site itself.
  let host = "";
  try {
    host = new URL(req.headers.get("origin") || req.headers.get("referer") || "").hostname;
  } catch {
    /* no origin */
  }
  if (!/^(www\.)?helgi\.dk$/.test(host) && !/\.netlify\.app$/.test(host)) return none();

  const ua = req.headers.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return none();

  const raw = await req.text();
  if (raw.length > 2000) return none();
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return none();
  }

  const secret = Netlify.env.get("SESSION_SECRET") || "";
  const now = new Date();
  const day = cphDay(now);
  const type = b.type === "cv" || b.type === "out" ? b.type : "view";
  const geo = context.geo || {};

  const event = {
    t: now.getTime(),
    d: day,
    type,
    path: clean(b.path, 120).split("?")[0] || "/",
    c: clean(b.c, 40).toLowerCase().replace(/[^a-z0-9_-]/g, ""),
    ref: clean(b.ref, 80).toLowerCase(),
    target: clean(b.target, 80).toLowerCase(),
    cc: geo.country?.code || "",
    country: geo.country?.name || "",
    city: geo.city || "",
    region: geo.subdivision?.name || "",
    device: device(ua),
    browser: browser(ua),
    vid: (await sha256Hex(`${secret}|${day}|${context.ip}|${ua}`)).slice(0, 16),
  };

  const store = getStore({ name: "visits", consistency: "strong" });
  const key = `e/${day}/${event.t}-${Math.random().toString(36).slice(2, 8)}`;
  await store.setJSON(key, event);
  return none();
};

export const config: Config = { path: "/api/track", method: "POST" };
