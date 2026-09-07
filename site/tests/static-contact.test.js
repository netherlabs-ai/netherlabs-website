import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function filesBelow(directory) {
  if (!existsSync(join(root, directory))) return [];
  const output = [];
  const visit = (current) => {
    for (const name of readdirSync(current)) {
      const path = join(current, name);
      if (statSync(path).isDirectory()) visit(path);
      else output.push(path);
    }
  };
  visit(join(root, directory));
  return output;
}

test("existing contact path and privacy remain available", () => {
  assert.match(read("app/contact/page.tsx"), /data-netlify="true"/);
  assert.match(read("app/components/HomeExperience.tsx"), /<DiagnosticForm source="homepage-drawer"/);
  assert.match(read("app/components/DiagnosticForm.tsx"), /role=\{state === "error" \? "alert" : "status"\}/);
  assert.match(read("app/privacy/page.tsx"), /24 months/);
  const source = filesBelow("app").map(path => readFileSync(path,"utf8")).join("\n");
  assert.doesNotMatch(source, /localStorage|sessionStorage|document\.cookie|dangerouslySetInnerHTML|XMLHttpRequest|sendBeacon|WebSocket/);
});

test("all returned text files avoid the prohibited dash character", () => {
  const ignored = new Set(["node_modules", ".next", "out", ".git"]);
  const textExtensions = new Set([".css", ".js", ".json", ".md", ".mjs", ".toml", ".ts", ".tsx", ".txt"]);
  const bad = String.fromCodePoint(0x2014);
  const matches = [];

  const visit = (directory) => {
    for (const name of readdirSync(directory)) {
      if (ignored.has(name)) continue;
      const path = join(directory, name);
      if (statSync(path).isDirectory()) visit(path);
      else if (textExtensions.has(name.slice(name.lastIndexOf(".")))) {
        if (readFileSync(path, "utf8").includes(bad)) matches.push(relative(root, path));
      }
    }
  };
  visit(root);
  assert.deepEqual(matches, []);
});

test("tabs retain connected keyboard controls and intrinsic equal-height panels", () => {
  const home = read("app/components/HomeExperience.tsx");
  const css = read("app/globals.css");
  assert.match(home, /useState\(0\)/);
  for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"]) assert.ok(home.includes(`"${key}"`), key);
  for (const attribute of ["role=\"tablist\"", "role=\"tab\"", "role=\"tabpanel\"", "aria-controls", "aria-labelledby", "aria-selected", "inert={active !== index}"]) assert.ok(home.includes(attribute), attribute);
  assert.match(css, /\.tab-panels\s*\{[^}]*display:\s*grid/);
  assert.match(css, /\.tab-panel\s*\{[^}]*grid-area:\s*1\s*\/\s*1/);
  assert.match(css, /\.tab-panel\.is-active\s*\{[^}]*visibility:\s*visible/);
});

test("cinematic scene retains reduced-motion and natural-height fallbacks", () => {
  const hero = read("app/components/CinematicHero.tsx");
  const css = read("app/components/cinematic-hero.css");
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.match(hero, /copy\.current\?\.scrollHeight/);
  assert.match(hero, /root\.dataset\.motion = scrollMode \? "scroll" : "natural"/);
  assert.match(hero, /cancelAnimationFrame/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.cinema-camera\s*\{\s*transform: none !important/);
  assert.match(css, /\.cinema-camera img\s*\{\s*animation: none/);
});
