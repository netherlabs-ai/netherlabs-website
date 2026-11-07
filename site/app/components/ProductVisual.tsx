import type { CSSProperties } from "react";
import type { VisualKind } from "../lib/products";

// Decorative, illustrative diagrams. Pure SVG + CSS: no JavaScript, slow ambient
// motion only, and everything stops under prefers-reduced-motion.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

function CommandVisual() {
  const cols = 6;
  const rows = 4;
  const hot = new Set([2, 7, 9, 13, 16, 22]);
  const attention = 15;
  const nodes = Array.from({ length: cols * rows }, (_, i) => ({ i, x: 60 + (i % cols) * 72, y: 70 + Math.floor(i / cols) * 74 }));
  return (
    <svg viewBox="0 0 480 360" className="pv-svg" aria-hidden="true" focusable="false">
      <g className="pv-faint">
        {nodes.filter((n) => n.i % cols < cols - 1).map((n) => <line key={`h${n.i}`} x1={n.x} y1={n.y} x2={n.x + 72} y2={n.y} />)}
        {nodes.filter((n) => n.i < cols * (rows - 1)).map((n) => <line key={`v${n.i}`} x1={n.x} y1={n.y} x2={n.x} y2={n.y + 74} />)}
      </g>
      {nodes.map((n) => n.i === attention
        ? <g key={n.i}><circle className="pv-ring" cx={n.x} cy={n.y} r="6" /><circle className="pv-accent-fill" cx={n.x} cy={n.y} r="6" /></g>
        : <circle key={n.i} className={hot.has(n.i) ? "pv-node pv-blink" : "pv-node"} style={hot.has(n.i) ? delay(n.i * 430) : undefined} cx={n.x} cy={n.y} r="4.5" />)}
      <g className="pv-scan"><line x1="0" y1="34" x2="0" y2="326" /></g>
      <text className="pv-label" x="60" y="40">FLEET</text>
      <text className="pv-label" x="204" y="40">TIMELINE</text>
      <text className="pv-label pv-label-accent" x="272" y="250">NEEDS YOU</text>
      <text className="pv-label" x="60" y="334">LIVE · STALE · DOWN · REJECTED</text>
    </svg>
  );
}

function ShieldVisual() {
  const labels = ["MCP", "SECRETS", "SUDO", "SSH", "NETWORK", "PATCH", "SHARING", "PERSIST"];
  const points = labels.map((label, i) => {
    const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
    const at = (r: number, c: number) => Math.round((c + r) * 10) / 10;
    const cos = Math.cos(angle);
    const anchor: "start" | "end" | "middle" = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
    return { label, anchor, x: at(cos * 128, 240), y: at(Math.sin(angle) * 128, 180), lx: at(cos * 142, 240), ly: at(Math.sin(angle) * 146, 184) };
  });
  const chain = [points[0], points[1], points[2]];
  return (
    <svg viewBox="0 0 480 360" className="pv-svg" aria-hidden="true" focusable="false">
      <g className="pv-faint"><circle cx="240" cy="180" r="128" fill="none" /><circle cx="240" cy="180" r="70" fill="none" /></g>
      <g className="pv-orbit"><circle cx="240" cy="180" r="100" fill="none" /></g>
      <polyline className="pv-chain" points={chain.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" />
      {points.map((p, i) => <circle key={p.label} className={i < 3 ? "pv-accent-fill" : "pv-node pv-blink"} style={i < 3 ? undefined : delay(i * 520)} cx={p.x} cy={p.y} r={i < 3 ? 5.5 : 4.5} />)}
      {points.map((p) => <text key={`l${p.label}`} className="pv-label" x={p.lx} y={p.ly} textAnchor={p.anchor}>{p.label}</text>)}
      <path className="pv-shield" d="M240 140 L272 152 V180 C272 200 258 214 240 222 C222 214 208 200 208 180 V152 Z" />
      <path className="pv-check" d="M226 181 L236 191 L255 170" />
    </svg>
  );
}

function EnvoyVisual() {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const t = i / 43;
    const envelope = 0.25 + 0.75 * Math.sin(Math.PI * t) * (0.65 + 0.35 * Math.sin(t * 19));
    return { i, x: Math.round((42 + i * 9.1) * 10) / 10, h: Math.round(Math.max(10, 190 * Math.abs(envelope))) };
  });
  return (
    <svg viewBox="0 0 480 360" className="pv-svg" aria-hidden="true" focusable="false">
      <line className="pv-faint" x1="30" y1="180" x2="450" y2="180" />
      {bars.map((b) => <rect key={b.i} className={b.i > 14 && b.i < 30 ? "pv-bar pv-bar-accent" : "pv-bar"} style={delay(-b.i * 90)} x={b.x} y={180 - b.h / 2} width="4" height={b.h} rx="2" />)}
      <text className="pv-label" x="42" y="44">YOU</text>
      <text className="pv-label" x="42" y="62">&quot;What is blocked today?&quot;</text>
      <text className="pv-label pv-label-accent" x="438" y="316" textAnchor="end">SPOKEN ON YOUR HARDWARE</text>
    </svg>
  );
}

function FuseVisual() {
  return (
    <svg viewBox="0 0 480 360" className="pv-svg" aria-hidden="true" focusable="false">
      <path className="pv-faint" d="M300 110 C250 110 250 165 200 165 M300 250 C250 250 250 195 200 195" fill="none" />
      <path className="pv-flow" d="M300 110 C250 110 250 165 200 165 M300 250 C250 250 250 195 200 195" fill="none" />
      <rect className="pv-box pv-box-accent" x="40" y="118" width="160" height="124" rx="18" />
      <text className="pv-label" x="58" y="148">MAC STUDIO</text>
      <text className="pv-value" x="58" y="190">Decode</text>
      <text className="pv-label" x="58" y="222">UNIFIED MEMORY</text>
      {[60, 200].map((y, i) => <g key={y}>
        <rect className="pv-box" x="300" y={y} width="140" height="100" rx="18" />
        <text className="pv-label" x="318" y={y + 30}>GB10 · 0{i + 1}</text>
        <text className="pv-value" x="318" y={y + 70}>Prefill</text>
      </g>)}
      <text className="pv-label pv-label-accent" x="250" y="184" textAnchor="middle">KV</text>
      <text className="pv-label" x="240" y="334" textAnchor="middle">ONE MODEL · TWO KINDS OF SILICON</text>
    </svg>
  );
}

export default function ProductVisual({ kind }: { kind: VisualKind }) {
  if (kind === "command") return <CommandVisual />;
  if (kind === "shield") return <ShieldVisual />;
  if (kind === "envoy") return <EnvoyVisual />;
  return <FuseVisual />;
}
