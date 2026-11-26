// Cloudflare Pages Function: POST /api/click records one tap on the download button.
// It stores only the time, the country Cloudflare reports and a coarse device type. No IP, no cookies.
// Needs a D1 binding named DB (database ningning-stats, table download_clicks).
const SITES = /(^|\.)lyn\.com\.de$|\.pages\.dev$/;

export async function onRequestPost({ request, env, waitUntil }) {
  const ua = request.headers.get("user-agent") || "";
  let from = "";
  try { from = new URL(request.headers.get("origin") || "").hostname; } catch (e) {}
  if (env.DB && SITES.test(from) && !/bot|spider|crawl|preview|slurp/i.test(ua)) {
    const os = /Android/i.test(ua) ? "android" : /iPhone|iPad|iPod/i.test(ua) ? "ios"
      : /Windows|Macintosh|Linux/i.test(ua) ? "desktop" : "other";
    waitUntil(env.DB.prepare("INSERT INTO download_clicks (ts, country, os) VALUES (?, ?, ?)")
      .bind(new Date().toISOString(), request.cf?.country || "", os).run().catch(() => {}));
  }
  return new Response(null, { status: 204 });
}
