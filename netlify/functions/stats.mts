import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { COOKIE, checkToken, cphDay, readCookie } from "../lib/auth.ts";

type Ev = {
  t: number; d: string; type: "view" | "cv" | "out";
  path: string; c: string; ref: string; target: string;
  cc: string; country: string; city: string; region: string;
  device: string; browser: string; vid: string;
};

const MAX_EVENTS = 6000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", "x-robots-tag": "noindex" },
  });

export default async (req: Request) => {
  const secret = Netlify.env.get("SESSION_SECRET");
  if (!secret) return json({ error: "not configured" }, 503);
  if (!(await checkToken(secret, readCookie(req.headers.get("cookie"), COOKIE)))) {
    return json({ error: "unauthorized" }, 401);
  }

  const url = new URL(req.url);
  const days = Math.min(90, Math.max(1, parseInt(url.searchParams.get("days") || "30", 10) || 30));

  // Day keys for the range, oldest first, in Copenhagen time.
  const dayKeys: string[] = [];
  for (let i = days - 1; i >= 0; i--) dayKeys.push(cphDay(new Date(Date.now() - i * 86400000)));

  const store = getStore({ name: "visits", consistency: "strong" });
  const keyLists = await Promise.all(dayKeys.map((d) => store.list({ prefix: `e/${d}/` })));
  let keys = keyLists.flatMap((l) => l.blobs.map((b) => b.key));
  const capped = keys.length > MAX_EVENTS;
  if (capped) keys = keys.slice(-MAX_EVENTS);

  const events: Ev[] = [];
  for (let i = 0; i < keys.length; i += 60) {
    const chunk = await Promise.all(keys.slice(i, i + 60).map((k) => store.get(k, { type: "json" }) as Promise<Ev | null>));
    for (const e of chunk) if (e && !e.path.startsWith("/__")) events.push(e);
  }
  events.sort((a, b) => a.t - b.t);

  // Aggregation helpers: unique visitors are unique (day, vid) pairs.
  const uniq = () => new Set<string>();
  const vk = (e: Ev) => `${e.d}|${e.vid}`;

  const series = new Map(dayKeys.map((d) => [d, { day: d, views: 0, v: uniq() }]));
  const countries = new Map<string, { code: string; name: string; views: number; v: Set<string> }>();
  const cities = new Map<string, { city: string; code: string; views: number; v: Set<string> }>();
  const campaigns = new Map<string, { c: string; views: number; cv: number; v: Set<string>; last: number }>();
  const referrers = new Map<string, Set<string>>();
  const pages = new Map<string, number>();
  const devices = new Map<string, Set<string>>();
  const outbound = new Map<string, number>();
  const all = uniq();
  let views = 0;
  let cv = 0;
  let out = 0;

  for (const e of events) {
    if (e.type === "cv") {
      cv++;
    } else if (e.type === "out") {
      out++;
      outbound.set(e.target || "other", (outbound.get(e.target || "other") || 0) + 1);
    }
    if (e.c) {
      const c = campaigns.get(e.c) || { c: e.c, views: 0, cv: 0, v: uniq(), last: 0 };
      if (e.type === "view") c.views++;
      if (e.type === "cv") c.cv++;
      c.v.add(vk(e));
      c.last = Math.max(c.last, e.t);
      campaigns.set(e.c, c);
    }
    if (e.type !== "view") continue;

    views++;
    all.add(vk(e));
    const s = series.get(e.d);
    if (s) {
      s.views++;
      s.v.add(e.vid);
    }
    pages.set(e.path, (pages.get(e.path) || 0) + 1);

    const cc = e.cc || "??";
    const co = countries.get(cc) || { code: cc, name: e.country || "Unknown", views: 0, v: uniq() };
    co.views++;
    co.v.add(vk(e));
    countries.set(cc, co);

    if (e.city) {
      const ck = `${e.city}|${e.cc}`;
      const ci = cities.get(ck) || { city: e.city, code: e.cc, views: 0, v: uniq() };
      ci.views++;
      ci.v.add(vk(e));
      cities.set(ck, ci);
    }

    const ref = e.ref || "Direct";
    (referrers.get(ref) || referrers.set(ref, uniq()).get(ref)!).add(vk(e));
    (devices.get(e.device) || devices.set(e.device, uniq()).get(e.device)!).add(vk(e));
  }

  const top = <T,>(rows: T[], by: (r: T) => number, n = 12) => rows.sort((a, b) => by(b) - by(a)).slice(0, n);

  return json({
    days,
    capped,
    totals: { views, visitors: all.size, cv, out, countries: countries.size, cities: cities.size },
    series: [...series.values()].map((s) => ({ day: s.day, views: s.views, visitors: s.v.size })),
    countries: top([...countries.values()].map((r) => ({ code: r.code, name: r.name, views: r.views, visitors: r.v.size })), (r) => r.visitors),
    cities: top([...cities.values()].map((r) => ({ city: r.city, code: r.code, views: r.views, visitors: r.v.size })), (r) => r.visitors),
    campaigns: top([...campaigns.values()].map((r) => ({ c: r.c, views: r.views, cv: r.cv, visitors: r.v.size, last: r.last })), (r) => r.last, 20),
    referrers: top([...referrers].map(([ref, set]) => ({ ref, visitors: set.size })), (r) => r.visitors, 10),
    pages: top([...pages].map(([path, n]) => ({ path, views: n })), (r) => r.views, 10),
    devices: top([...devices].map(([device, set]) => ({ device, visitors: set.size })), (r) => r.visitors, 4),
    outbound: top([...outbound].map(([target, count]) => ({ target, count })), (r) => r.count, 8),
    recent: events.slice(-40).reverse().map((e) => ({
      t: e.t, type: e.type, path: e.path, c: e.c, ref: e.ref, target: e.target,
      cc: e.cc, country: e.country, city: e.city, device: e.device, browser: e.browser,
    })),
  });
};

export const config: Config = { path: "/api/stats", method: "GET" };
