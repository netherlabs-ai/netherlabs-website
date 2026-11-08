import assert from "node:assert/strict";

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base-url");
const draft = args.includes("--draft");
assert.notEqual(baseIndex, -1, "Usage: npm run verify:live -- --base-url https://DEPLOY-HOST --draft");
assert.ok(args[baseIndex + 1], "A base URL is required");

const rawBase = args[baseIndex + 1];
assert.doesNotMatch(rawBase, /[?#]/, "Base URL must not contain a query or fragment");
const rawAuthority = rawBase.match(/^https:\/\/([^/?#]+)/)?.[1] ?? "";
assert.doesNotMatch(rawAuthority, /:\d+$/, "A port is not allowed");

const allowedArgs = new Set(["--base-url", "--draft", rawBase]);
assert.deepEqual(args.filter((arg) => !allowedArgs.has(arg)), [], "Unknown argument");

const base = new URL(rawBase);
assert.equal(base.protocol, "https:", "Base URL must use HTTPS");
assert.equal(base.username, "", "Credentials are not allowed");
assert.equal(base.password, "", "Credentials are not allowed");
assert.equal(base.port, "", "A port is not allowed");
assert.equal(base.search, "", "A query is not allowed");
assert.equal(base.hash, "", "A fragment is not allowed");
assert.equal(base.pathname, "/", "Base URL must not contain a path");

const securityHeaders = {
  "content-security-policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none'; media-src 'self'; manifest-src 'self'; worker-src 'none'; upgrade-insecure-requests",
  "permissions-policy": "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), usb=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

// Netlify owns *.netlify.app and emits its one-year HSTS policy on draft hosts.
// The custom-domain production contract retains Netlify's documented preload value:
// https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/#hsts-preload
const draftHsts = "max-age=31536000; includeSubDomains; preload";
const productionHsts = "max-age=63072000; includeSubDomains; preload";

// Netlify's edge answers the revalidation of an unchanged static file after a publish
// (cache-status "fwd=stale; fwd-status=304", then "hit" from that stored copy) with its
// platform default HSTS instead of the configured header. Observed 2026-11-07 on fonts,
// favicon and images; not controllable from netlify.toml. Static assets may carry it only
// in that cache state; HTML routes, the 404 and the intake function stay strict.
const platformHsts = "max-age=31536000";

function verifyHeaders(response, label, { asset = false } = {}) {
  for (const [name, expected] of Object.entries(securityHeaders)) {
    assert.equal(response.headers.get(name), expected, `${label}: ${name}`);
  }
  const hsts = response.headers.get("strict-transport-security");
  const revalidated = /fwd=stale|;\s*hit\b/.test(response.headers.get("cache-status") ?? "");
  if (!(asset && !draft && revalidated && hsts === platformHsts)) assert.equal(
    hsts,
    draft ? draftHsts : productionHsts,
    `${label}: strict-transport-security`,
  );
  if (draft) assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/i, `${label}: draft noindex`);
  assert.equal(response.headers.has("set-cookie"), false, `${label}: no cookie`);
}

function verifyNoCors(response, origin, label) {
  for (const [name, value] of response.headers) {
    assert.equal(name.toLowerCase().startsWith("access-control-"), false, `${label}: ${name}`);
    assert.equal(value.includes("*"), false, `${label}: wildcard header value`);
    assert.equal(Boolean(origin) && origin !== "null" && value.includes(origin), false, `${label}: reflected origin`);
  }
  assert.doesNotMatch(response.headers.get("allow") ?? "", /POST/i, `${label}: POST allowance`);
}

async function request(path, init = {}) {
  const url = new URL(path, base);
  const response = await fetch(url, { redirect: "manual", ...init });
  return { response, body: await response.text(), url };
}

const routes = [
  "/", "/products/", "/nethercommand/", "/nethershield-guard/", "/netherenvoy/", "/netherfuse/",
  "/about/", "/workflow-audit/", "/netherforge/", "/contact/", "/privacy/",
];
const structuredRoutes = new Set(["/", "/products/", "/nethercommand/", "/nethershield-guard/", "/netherenvoy/", "/netherfuse/"]);
const canonicalOrigin = "https://netherlabs.ai";
const meta = (body, pattern) => body.match(pattern)?.[1] ?? "";
const ogImages = new Set();
let jsonLdBlocks = 0;
for (const route of routes) {
  const { response, body } = await request(route);
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/i, route);
  assert.match(body, /NETHER LABS/i, route);
  verifyHeaders(response, route);

  // SEO contract: title, canonical, Open Graph image and parseable JSON-LD.
  assert.ok(meta(body, /<title>([^<]+)<\/title>/).length > 10, `${route}: title`);
  assert.equal(meta(body, /<link rel="canonical" href="([^"]+)"/), canonicalOrigin + route, `${route}: canonical`);
  assert.ok(meta(body, /<meta name="description" content="([^"]+)"/).length > 50, `${route}: description`);
  const image = meta(body, /<meta property="og:image" content="([^"]+)"/);
  assert.equal(new URL(image).origin, canonicalOrigin, `${route}: og:image origin`);
  ogImages.add(new URL(image).pathname);
  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  if (structuredRoutes.has(route)) assert.ok(blocks.length > 0, `${route}: JSON-LD`);
  jsonLdBlocks += blocks.length;
}
for (const image of ogImages) {
  const { response } = await request(image);
  assert.equal(response.status, 200, image);
  assert.match(response.headers.get("content-type") ?? "", /^image\/jpeg/i, image);
}

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.response.status, 200, "sitemap status");
assert.match(sitemap.response.headers.get("content-type") ?? "", /xml/i, "sitemap type");
assert.deepEqual(
  [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort(),
  routes.map((route) => canonicalOrigin + route).sort(),
  "sitemap lists every public route",
);
const robots = await request("/robots.txt");
assert.equal(robots.response.status, 200, "robots status");
assert.match(robots.body, /Allow: \//, "robots allow");
assert.match(robots.body, /Sitemap: https:\/\/netherlabs\.ai\/sitemap\.xml/, "robots sitemap");
const llms = await request("/llms.txt");
assert.equal(llms.response.status, 200, "llms.txt status");
assert.match(llms.response.headers.get("content-type") ?? "", /^text\/plain/i, "llms.txt type");
assert.match(llms.body, /^# Nether Labs/, "llms.txt body");

// NetherForge was named Steward until 2026-10-27; the old route must keep working.
for (const route of ["/steward", "/steward/"]) {
  const { response } = await request(route);
  assert.equal(response.status, 301, `${route}: redirect status`);
  assert.equal(new URL(response.headers.get("location") ?? "", base).pathname, "/netherforge/", `${route}: redirect target`);
}

for (const route of ["/", "/contact/"]) {
  const { body } = await request(route);
  assert.match(body, /<form\b/i, `${route}: visible diagnostic form`);
  for (const field of ["name", "email", "company", "timing", "workflow", "challenge"]) {
    assert.match(body, new RegExp(`name="${field}"`, "i"), `${route}: ${field} field`);
  }
}

const contact = (await request("/contact/")).body;
assert.match(contact, /data-netlify="true"/i, "contact: Netlify Forms declaration");
assert.match(contact, /netlify-honeypot="bot-field"/i, "contact: Netlify honeypot");
assert.match(contact, /name="form-name" value="workflow-diagnostic"/i, "contact: form name");

const missing = await request("/nether-labs-verifier-missing-page/");
assert.equal(missing.response.status, 404, "unknown route status");
assert.match(missing.response.headers.get("content-type") ?? "", /^text\/html/i, "unknown route type");
assert.match(missing.body, /PAGE NOT FOUND/i, "unknown route brand");
verifyHeaders(missing.response, "unknown route");

const home = (await request("/")).body;
const assets = new Set(
  [...home.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)]
    .map((match) => match[1])
    .filter((path) => /\.(?:css|js|svg|webp|woff2)$/.test(path)),
);
assert.ok(assets.size > 0, "No local assets found");
for (const asset of assets) {
  const { response } = await request(asset);
  assert.equal(response.status, 200, asset);
  verifyHeaders(response, asset, { asset: true });
}

// Home hero (Night city, NET-2224): every candidate the <picture> and its preloads can pick is served whole, with
// the right type and real image bytes, and the LCP image keeps its intrinsic size and high fetch priority.
const heroBlock = home.match(/<section class="cinema"[\s\S]*?<\/picture>/)?.[0] ?? "";
assert.ok(heroBlock, "home: hero picture");
const heroImg = heroBlock.match(/<img\b[^>]*>/)?.[0] ?? "";
assert.match(heroImg, /src="\/night-city-1920\.webp"/, "home hero: fallback src");
assert.match(heroImg, /width="1920"/, "home hero: width");
assert.match(heroImg, /height="1080"/, "home hero: height");
assert.match(heroImg, /fetchpriority="high"/i, "home hero: fetchpriority");
assert.match(home, /<link rel="preload"[^>]*imageSrcSet="\/night-city-mobile-780\.avif/i, "home: mobile hero preload");
assert.match(home, /<link rel="preload"[^>]*imageSrcSet="\/night-city-1920\.avif/i, "home: desktop hero preload");
const heroCandidates = new Set(["/night-city-1920.webp"]);
for (const set of heroBlock.matchAll(/srcSet="([^"]+)"/gi)) {
  for (const part of set[1].split(",")) heroCandidates.add(part.trim().split(/\s+/)[0]);
}
assert.ok(heroCandidates.size >= 7, `home hero: ${heroCandidates.size} candidates`);
const magic = { avif: (b) => b.subarray(4, 12).toString("latin1") === "ftypavif", webp: (b) => b.subarray(8, 12).toString("latin1") === "WEBP", jpg: (b) => b[0] === 0xff && b[1] === 0xd8 };
for (const path of heroCandidates) {
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  const bytes = Buffer.from(await response.arrayBuffer());
  const kind = path.split(".").pop();
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") ?? "", kind === "jpg" ? /^image\/jpeg/i : new RegExp(`^image/${kind}`, "i"), `${path}: type`);
  assert.ok(magic[kind]?.(bytes), `${path}: ${kind} bytes`);
  assert.ok(bytes.length > 20000 && bytes.length <= 500000, `${path}: ${bytes.length} bytes`);
  verifyHeaders(response, path, { asset: true });
}

const intakePath = "/.netlify/functions/intake-form";
const intakeGet = await request(intakePath);
assert.equal(intakeGet.response.status, 405, "intake GET status");
assert.match(intakeGet.response.headers.get("content-type") ?? "", /^application\/json/i, "intake GET type");
assert.equal(intakeGet.response.headers.get("allow"), "POST, OPTIONS", "intake GET allow");
assert.equal(intakeGet.response.headers.get("cache-control"), "no-store", "intake GET no-store");
assert.equal(intakeGet.response.headers.get("x-content-type-options"), "nosniff", "intake GET nosniff");
assert.equal(intakeGet.response.headers.get("strict-transport-security"), draft ? draftHsts : productionHsts, "intake GET HSTS");
assert.deepEqual(JSON.parse(intakeGet.body), { success: false, message: "Method not allowed." });

const intakeInvalid = await request(intakePath, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{}",
});
assert.equal(intakeInvalid.response.status, 422, "intake invalid POST status");
assert.match(intakeInvalid.response.headers.get("content-type") ?? "", /^application\/json/i, "intake invalid POST type");
assert.equal(intakeInvalid.response.headers.get("cache-control"), "no-store", "intake invalid POST no-store");
assert.match(JSON.parse(intakeInvalid.body).message, /Missing required fields/, "intake validation message");

const intakeOptions = await request(intakePath, { method: "OPTIONS" });
assert.equal(intakeOptions.response.status, 204, "intake OPTIONS status");
assert.equal(intakeOptions.response.headers.get("allow"), "POST, OPTIONS", "intake OPTIONS allow");
assert.equal(intakeOptions.response.headers.get("cache-control"), "no-store", "intake OPTIONS no-store");
assert.equal(intakeOptions.body, "", "intake OPTIONS body");

const retiredPaths = ["/api/intake-form"];
const origins = ["https://netherlabs.ai", base.origin, "https://foreign.example", "null"];

for (const path of retiredPaths) {
  for (const method of ["GET", "POST"]) {
    const init = method === "POST"
      ? { method, headers: { "content-type": "application/json" }, body: JSON.stringify({ probe: "synthetic" }) }
      : { method };
    const result = await request(path, init);
    const label = `${path} ${method}`;
    assert.equal(result.response.status, 404, label);
    assert.match(result.response.headers.get("content-type") ?? "", /^text\/html/i, label);
    assert.match(result.body, /PAGE NOT FOUND/i, label);
    verifyHeaders(result.response, label);
    verifyNoCors(result.response, "", label);
  }

  const bare = await request(path, { method: "OPTIONS" });
  const bareLabel = `${path} bare OPTIONS`;
  assert.equal(bare.response.status, 404, bareLabel);
  assert.match(bare.response.headers.get("content-type") ?? "", /^text\/plain/i, bareLabel);
  assert.equal(bare.response.headers.get("content-length"), "9", bareLabel);
  assert.equal(bare.body, "Not Found", bareLabel);
  verifyHeaders(bare.response, bareLabel);
  verifyNoCors(bare.response, "", bareLabel);

  for (const origin of origins) {
    const preflight = await request(path, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    const label = `${path} preflight ${origin}`;
    assert.equal(preflight.response.status, 200, label);
    assert.equal(preflight.response.headers.get("content-length"), "0", label);
    assert.equal(preflight.response.headers.has("content-type"), false, label);
    assert.equal(preflight.body, "", label);
    verifyHeaders(preflight.response, label);
    verifyNoCors(preflight.response, origin, label);
  }
}

console.log(`Verified ${base.origin} across ${routes.length} routes (canonical, OG images ${ogImages.size}, JSON-LD blocks ${jsonLdBlocks}, sitemap, robots, llms.txt), ${assets.size} assets, ${heroCandidates.size} hero images, the active intake contract and the retired-route matrix.`);
