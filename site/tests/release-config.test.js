import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const json = (path) => JSON.parse(read(path));

test("lockfile agrees with pinned production dependencies", () => {
 const pkg=json("package.json"), lock=json("package-lock.json");
 assert.deepEqual(lock.packages[""].dependencies,pkg.dependencies);
 for(const [name,version] of Object.entries(pkg.dependencies)) {
  assert.match(version,/^\d+\.\d+\.\d+$/);
  assert.equal(lock.packages[`node_modules/${name}`].version,version);
 }
});

test("Next static export configuration is exact", () => {
  const source = read("next.config.ts");
  assert.match(source, /output:\s*"export"/);
  assert.match(source, /trailingSlash:\s*true/);
  assert.match(source, /root:\s*process\.cwd\(\)/);
  assert.match(source, /NEXT_PUBLIC_BASE_PATH/);
  for (const marker of ["redirects:", "rewrites:", "headers:", "middleware", "serverActions"]) {
    assert.equal(source.includes(marker), false, marker);
  }
});

test("Netlify build, fallback and security headers are preserved", () => {
  const source = read("netlify.toml");
  for (const required of [
    'command = "npm run build"',
    'publish = "out"',
    'NODE_VERSION = "22.13.0"',
    'NEXT_TELEMETRY_DISABLED = "1"',
    'from = "/*"',
    'to = "/404.html"',
    "status = 404",
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "media-src 'self'",
    "manifest-src 'self'",
    "worker-src 'none'",
    "upgrade-insecure-requests",
    'Permissions-Policy = "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), usb=()"',
    'Referrer-Policy = "strict-origin-when-cross-origin"',
    'Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"',
    'X-Content-Type-Options = "nosniff"',
    'X-Frame-Options = "DENY"',
  ]) assert.equal(source.includes(required), true, required);

  assert.doesNotMatch(source, /unsafe-eval|blob:|https?:\/\//i);
  assert.match(source, /^\s*functions\s*=\s*"netlify\/functions"/m);
  const csp = source.match(/Content-Security-Policy = "([^"]+)"/)?.[1] ?? "";
  assert.equal(csp.includes("*"), false);
});

test("required source and evidence files exist", () => {
  const required = [
    ".gitignore",
    "README.md",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "netlify.toml",
    "next-env.d.ts",
    "tsconfig.json",
    "eslint.config.mjs",
    "postcss.config.mjs",
    "app/layout.tsx",
    "app/page.tsx",
    "app/globals.css",
    "app/not-found.tsx",
    "app/robots.ts",
    "app/sitemap.ts",
    "app/about/page.tsx",
    "app/workflow-audit/page.tsx",
    "app/steward/page.tsx",
    "app/contact/page.tsx",
    "app/privacy/page.tsx",
    "docs/contact-data-operations.md",
    "scripts/verify-live.mjs",
    "tests/static-contact.test.js",
    "tests/release-config.test.js",
    "tests/build-output.test.js",
    "docs/upstream/GPT_DELIVERY.md",
    "docs/upstream/CHANGED_FILES.md",
    "docs/upstream/BASELINE_PROVENANCE.json",
    "docs/upstream/V2_ACCEPTANCE.json",
    "docs/upstream/SOURCE_SHA256SUMS.txt",
  ];
  required.forEach((path) => assert.equal(existsSync(join(root, path)), true, path));
});

test("prohibited roots and nested projects are absent", () => {
  const forbidden = [
    ".git", ".openai", ".wrangler", ".vinext", "dist",
    "worker", "reposition", "investor", "portal", "share",
    "netlify/edge-functions", "vite.config.ts", "wrangler.jsonc", "middleware.ts",
  ];
  forbidden.forEach((path) => assert.equal(existsSync(join(root, path)), false, path));

  const packageFiles = [];
  const visit = (directory) => {
    for (const name of readdirSync(directory)) {
      if (["node_modules", ".next", "out"].includes(name)) continue;
      const path = join(directory, name);
      if (statSync(path).isDirectory()) visit(path);
      else if (name === "package.json") packageFiles.push(path);
    }
  };
  visit(root);
  assert.equal(packageFiles.length, 1);
});

