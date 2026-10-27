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

function verifyHeaders(response, label) {
  for (const [name, expected] of Object.entries(securityHeaders)) {
    assert.equal(response.headers.get(name), expected, `${label}: ${name}`);
  }
  assert.equal(
    response.headers.get("strict-transport-security"),
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

const routes = ["/", "/about/", "/workflow-audit/", "/netherforge/", "/contact/", "/privacy/"];
for (const route of routes) {
  const { response, body } = await request(route);
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/i, route);
  assert.match(body, /NETHER LABS/i, route);
  verifyHeaders(response, route);
}

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
  verifyHeaders(response, asset);
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

console.log(`Verified ${base.origin} across ${routes.length} routes, ${assets.size} assets, the active intake contract and the retired-route matrix.`);
