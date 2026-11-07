import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";
import test from "node:test";

const root = process.cwd();
const out = join(root, "out");
const read = (path) => readFileSync(join(root, path), "utf8");

const routes = [
  ["out/index.html", "AI Workflow Strategy and Implementation", "Nether Labs helps established businesses find where AI can improve real workflows: a focused diagnostic, clear human review and a practical implementation path.", "https://netherlabs.ai/"],
  ["out/products/index.html", "Products: Local-First AI Software | Nether Labs", "Software for running AI agents on hardware you control: NetherCommand, NetherShield Guard, NetherEnvoy, NetherFuse and NetherForge. All in development.", "https://netherlabs.ai/products/"],
  ["out/nethercommand/index.html", "NetherCommand: AI Agent Command Center | Nether Labs", "A command center for teams running AI agents: agent work, hardware health and decisions that need a person, in one read-only view. In development.", "https://netherlabs.ai/nethercommand/"],
  ["out/nethershield-guard/index.html", "NetherShield Guard: AI Agent Security for Your Machine | Nether Labs", "NetherShield Guard audits a computer for the ways an AI agent could be turned against you and explains each fix. Runs locally. Linux today; macOS in progress.", "https://netherlabs.ai/nethershield-guard/"],
  ["out/netherenvoy/index.html", "NetherEnvoy: Private Voice Assistant for AI Agents | Nether Labs", "NetherEnvoy is a private voice interface for your AI agents, with replies spoken by a voice model running on your own hardware. In development.", "https://netherlabs.ai/netherenvoy/"],
  ["out/netherfuse/index.html", "NetherFuse: One Model Across Mac Studio and DGX Spark | Nether Labs", "NetherFuse is software to run one AI model across a Mac Studio and NVIDIA DGX Spark systems over a fast network link. Early research; no benchmarks claimed.", "https://netherlabs.ai/netherfuse/"],
  ["out/about/index.html", "About | Nether Labs", "How Nether Labs helps established organizations direct AI at real operating constraints and compound governed improvements.", "https://netherlabs.ai/about/"],
  ["out/workflow-audit/index.html", "AI Workflow Diagnostic | Nether Labs", "Map one real workflow, expose operating drag, define controls and create a governed path to a first pilot.", "https://netherlabs.ai/workflow-audit/"],
  ["out/netherforge/index.html", "NetherForge | Nether Labs", "NetherForge is the Nether Labs pathway for connecting workflows, knowledge, agents, governance, metrics and human authority.", "https://netherlabs.ai/netherforge/"],
  ["out/contact/index.html", "Contact | Nether Labs", "Contact Nether Labs about a workflow diagnostic for an established business.", "https://netherlabs.ai/contact/"],
  ["out/privacy/index.html", "Privacy | Nether Labs", "How Nether Labs handles public website request data and workflow diagnostic submissions.", "https://netherlabs.ai/privacy/"],
];
const productPages = ["nethercommand", "nethershield-guard", "netherenvoy", "netherfuse"];

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}

function nodes(html) {
  return jsonLd(html).flatMap((block) => block["@graph"] ?? [block]);
}

function jpegSize(path) {
  const data = readFileSync(path);
  assert.equal(data.readUInt16BE(0), 0xffd8, `${path}: JPEG`);
  for (let offset = 2; offset < data.length;) {
    const marker = data.readUInt16BE(offset);
    const length = data.readUInt16BE(offset + 2);
    if (marker >= 0xffc0 && marker <= 0xffc3) return [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)];
    offset += 2 + length;
  }
  throw new Error(`${path}: no SOF marker`);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  const output = [];
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) output.push(...walk(path));
    else output.push(path);
  }
  return output;
}

function attribute(html, tagPattern, name) {
  const tag = html.match(tagPattern)?.[0] ?? "";
  return tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1] ?? "";
}

function rgb(hex) {
  return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
}

function luminance(color) {
  const channels = color.map((value) => value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}


test("all public routes and branded 404 are generated", () => {
  for (const [path] of routes) {
    const full = join(root, path);
    assert.equal(existsSync(full), true, path);
    assert.ok(statSync(full).size > 1000, path);
    const html = read(path);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, path);
    assert.match(html, /href="#main-content"/);
    assert.match(html, /<header\b/i);
    assert.match(html, /<main\b/i);
    assert.match(html, /<footer\b/i);
  }

  const notFound = read("out/404.html");
  assert.match(notFound, /NETHER LABS/i);
  assert.match(notFound, /PAGE NOT FOUND/i);
  assert.match(notFound, /name="robots" content="noindex, nofollow"/i);
  assert.match(notFound, /href="\/"/);
  assert.match(notFound, /href="\/contact\/"/);
});

test("route metadata is unique, exact and local", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [path, title, description, canonical] of routes) {
    const html = read(path);
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.equal(attribute(html, /<meta[^>]+name="description"[^>]*>/i, "content"), description);
    assert.equal(attribute(html, /<link[^>]+rel="canonical"[^>]*>/i, "href"), canonical);
    assert.equal(attribute(html, /<meta[^>]+property="og:url"[^>]*>/i, "content"), canonical);
    assert.equal(attribute(html, /<meta[^>]+property="og:site_name"[^>]*>/i, "content"), "Nether Labs");
    assert.equal(attribute(html, /<meta[^>]+property="og:locale"[^>]*>/i, "content"), "en_US");
    assert.equal(attribute(html, /<meta[^>]+property="og:type"[^>]*>/i, "content"), "website");
    assert.equal(attribute(html, /<meta[^>]+name="twitter:card"[^>]*>/i, "content"), "summary_large_image");
    const imageUrl = attribute(html, /<meta[^>]+property="og:image"[^>]*>/i, "content");
    assert.equal(new URL(imageUrl).origin, "https://netherlabs.ai");
    const imagePath = join(out, new URL(imageUrl).pathname);
    assert.equal(existsSync(imagePath), true);
    assert.deepEqual(jpegSize(imagePath), [1200, 630], imageUrl);
    assert.equal(attribute(html, /<meta[^>]+property="og:image:width"[^>]*>/i, "content"), "1200");
    assert.equal(attribute(html, /<meta[^>]+property="og:image:height"[^>]*>/i, "content"), "630");
    assert.ok(attribute(html, /<meta[^>]+property="og:image:alt"[^>]*>/i, "content").length > 10, path);
    assert.equal(attribute(html, /<meta[^>]+name="twitter:image"[^>]*>/i, "content"), imageUrl);
    assert.ok(title.length <= 75 && description.length >= 70 && description.length <= 165, `${path}: title/description length`);
    assert.match(html, /<link rel="preload" href="\/fonts\/geist-sans\.woff2" as="font"[^>]*crossorigin/i, `${path}: font preload`);
    titles.add(title);
    descriptions.add(description);
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
  assert.equal(existsSync(join(out, "favicon.svg")), true);
});

test("robots, sitemap and contact output match the production contract", () => {
  const robots = read("out/robots.txt");
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/netherlabs\.ai\/sitemap\.xml/i);

  const sitemap = read("out/sitemap.xml");
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  assert.deepEqual(urls, routes.map((route) => route[3]).sort());
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  for (const entry of entries) assert.match(entry, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, entry);

  const llms = read("out/llms.txt");
  assert.match(llms, /^# Nether Labs\n\n> /);
  for (const slug of [...productPages, "netherforge", "workflow-audit", "contact"]) assert.ok(llms.includes(`https://netherlabs.ai/${slug}/`), slug);

  for (const path of ["out/index.html", "out/contact/index.html"]) {
    const html = read(path);
    assert.match(html, /<form\b/);
    assert.match(html, /name="email"/);
    assert.match(html, /name="challenge"/);
    assert.doesNotMatch(html, /website does not collect or submit your message/i);
  }
});

test("generated output contains no retired scaffold or remote runtime", () => {
  const textFiles = walk(out).filter((path) => [".css", ".html", ".json", ".txt", ".xml"].includes(extname(path)));
  const source = textFiles.map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(source, /\/api\/intake-form/i);
  assert.doesNotMatch(source, /chatgpt\.site|workers\.dev|cloudflare|wrangler|\/staging\b/i);
  assert.equal(source.includes(String.fromCodePoint(0x2014)), false);

  const remoteRuntime = [...source.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)/gi)]
    .map((match) => new URL(match[1]))
    .filter((url) => url.origin !== "https://netherlabs.ai");
  assert.deepEqual(remoteRuntime, []);
});

test("local assets exist and pass source budgets", () => {
  const publicFiles = walk(join(root, "public"));
  const rasters = publicFiles.filter((path) => [".webp", ".avif", ".png", ".jpg", ".jpeg"].includes(extname(path).toLowerCase()));
  let rasterTotal = 0;
  for (const path of rasters) {
    const size = statSync(path).size;
    assert.ok(size <= 500000, `${path}: ${size}`);
    rasterTotal += size;
    assert.match(path.slice(join(root, "public").length + 1), /^[a-z0-9/-]+\.(webp|avif|png|jpg|jpeg)$/);
  }
  assert.ok(rasterTotal <= 2000000, String(rasterTotal));

  for (const required of [
    "out/hero-factory-enhanced-1920.webp",
    "out/hero-factory-enhanced-3840.webp",
    "out/hero-factory-enhanced-mobile.webp",
    "out/fonts/geist-sans.woff2",
    "out/fonts/geist-mono.woff2",
    "out/favicon.svg",
  ]) assert.equal(existsSync(join(root, required)), true, required);

  for (const [path] of routes) {
    const html = read(path);
    for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(image[0], /\balt="[^"]*"/i);
      assert.match(image[0], /\bwidth="\d+"/i);
      assert.match(image[0], /\bheight="\d+"/i);
    }
  }
});

test("generated JavaScript and CSS pass gzip budgets", () => {
  const chunks = walk(join(out, "_next", "static", "chunks"));
  const jsTotal = chunks.filter((path) => extname(path) === ".js").reduce((sum, path) => sum + gzipSync(readFileSync(path)).length, 0);
  const cssTotal = chunks.filter((path) => extname(path) === ".css").reduce((sum, path) => sum + gzipSync(readFileSync(path)).length, 0);
  assert.ok(jsTotal <= 250000, `JavaScript gzip bytes: ${jsTotal}`);
  assert.ok(cssTotal <= 40000, `CSS gzip bytes: ${cssTotal}`);
  const css = chunks.filter((path) => extname(path) === ".css").map((path) => readFileSync(path, "utf8")).join("\n");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("primary text and focus colors preserve WCAG AA contrast", () => {
  const css = read("app/globals.css");
  const pairs = [
    ["#142125", "#f3f4f0"],
    ["#f3f4f0", "#080d0f"],
    ["#b0baba", "#11191c"],
    ["#080d0f", "#a3f2d5"],
    ["#4a5a56", "#f3f4f0"],
    ["#65756d", "#fafbf7"],
    ["#b6c9bb", "#080d0f"],
  ];
  for (const [foreground, background] of pairs) assert.ok(contrast(rgb(foreground), rgb(background)) >= 4.5, `${foreground} on ${background}`);
  assert.ok(contrast(rgb("#2c826c"), rgb("#f3f4f0")) >= 3);
  assert.match(css, /:focus-visible\s*\{[^}]*outline:2px solid #2c826c/);
  assert.match(css, /dialog :focus-visible\s*\{[^}]*outline-color:var\(--signal\)/);
});

test("structured data is valid JSON-LD and stays honest", () => {
  const home = nodes(read("out/index.html"));
  const types = home.map((node) => node["@type"]);
  for (const type of ["Organization", "WebSite", "FAQPage"]) assert.ok(types.includes(type), type);
  const organization = home.find((node) => node["@type"] === "Organization");
  assert.equal(organization.url, "https://netherlabs.ai/");
  assert.equal(existsSync(join(out, new URL(organization.logo.url).pathname)), true);
  assert.equal(home.find((node) => node["@type"] === "FAQPage").mainEntity.length, (read("out/index.html").match(/<details\b/g) ?? []).length);

  for (const slug of productPages) {
    const html = read(`out/${slug}/index.html`);
    const graph = nodes(html);
    const app = graph.find((node) => node["@type"] === "SoftwareApplication");
    assert.ok(app, slug);
    assert.equal(app.url, `https://netherlabs.ai/${slug}/`);
    assert.match(app.creativeWorkStatus, /no external release/i);
    for (const key of ["offers", "aggregateRating", "review", "price"]) assert.equal(key in app, false, `${slug}: ${key}`);
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
    assert.deepEqual(crumbs.itemListElement.map((item) => item.item), ["https://netherlabs.ai/", "https://netherlabs.ai/products/", `https://netherlabs.ai/${slug}/`]);
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, (html.match(/<details\b/g) ?? []).length, `${slug}: FAQ matches visible questions`);
    for (const question of faq.mainEntity) assert.ok(html.includes(question.name.replace(/'/g, "&#x27;")), question.name);
    assert.match(html, /href="\/contact\/\?product=/, `${slug}: early-access CTA`);
    assert.match(html, /WHAT IS REAL TODAY/, `${slug}: status section`);
  }

  const hub = nodes(read("out/products/index.html"));
  const list = hub.find((node) => node["@type"] === "CollectionPage").mainEntity.itemListElement;
  assert.deepEqual(list.map((item) => new URL(item.url).pathname), ["/nethercommand/", "/nethershield-guard/", "/netherenvoy/", "/netherfuse/", "/netherforge/"]);

  const fuse = read("out/netherfuse/index.html");
  assert.match(fuse, /Ash Hart/);
  assert.match(fuse, /Apache-2\.0/);
});

test("public copy contains no internal hosts, addresses or partner names", () => {
  const files = walk(out).filter((path) => [".html", ".txt", ".xml"].includes(extname(path)));
  const source = files.map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(source, /ts\.net|tailnet|tailscale|100\.\d+\.\d+\.\d+|192\.168\.|yvess-mac-studio|pinax|paperclip|\bNET-\d+|\bINI-\d+/i);
});
