// Shared auth helpers. Web Crypto only, so the same file runs in Netlify
// Functions (Node) and Edge Functions (Deno).

const enc = new TextEncoder();

export const COOKIE = "__Host-ht";

const toHex = (buf: ArrayBuffer): string =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

export async function hmacHex(secret: string, msg: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

export async function sha256Hex(s: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
}

/** Constant-time string comparison. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** Compares submitted credentials to the expected ones without leaking timing. */
export async function credsOk(
  secret: string,
  user: string,
  pass: string,
  expectedUser: string,
  expectedPass: string,
): Promise<boolean> {
  const a = await hmacHex(secret, `c\n${user}\n${pass}`);
  const b = await hmacHex(secret, `c\n${expectedUser}\n${expectedPass}`);
  return safeEqual(a, b);
}

export async function makeToken(secret: string, ttlSec = 14 * 86400): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const sig = await hmacHex(secret, `v1.${exp}`);
  return `${exp}.${sig}`;
}

export async function checkToken(secret: string, token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmacHex(secret, `v1.${exp}`));
}

export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

/** Calendar day (YYYY-MM-DD) in Copenhagen time. */
export function cphDay(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Copenhagen" }).format(d);
}
