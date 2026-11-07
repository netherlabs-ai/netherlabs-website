// Product pillar content. Every claim here must stay true and conservative:
// these products are in development, so "today" lists only what runs now
// (inside Nether Labs) and "next" lists what is planned or missing.
// Sources are recorded in engineering/state/growth-20261107/site/RESULT.md.

export type ProductSlug = "nethercommand" | "nethershield-guard" | "netherenvoy" | "netherfuse";
export type VisualKind = "command" | "shield" | "envoy" | "fuse";

export type Product = {
  slug: ProductSlug;
  name: string;
  path: `/${ProductSlug}/`;
  accent: string;
  visual: VisualKind;
  category: string;
  status: string;
  title: string;
  description: string;
  summary: string;
  h1: string;
  lead: string;
  applicationCategory: string;
  operatingSystem: string;
  ogImage: string;
  ogAlt: string;
  problem: { heading: string; points: { title: string; copy: string }[] };
  how: { heading: string; steps: { title: string; copy: string; planned?: boolean }[] };
  today: { working: string[]; next: string[] };
  faqs: { q: string; a: string }[];
  credit?: string;
  legal?: string;
};

const earlyAccess = "Not yet. It runs inside Nether Labs today and has no external release. Join the early-access interest list through the contact form and tell us about your setup; we will reach out when there is something real to try.";

export const products: readonly Product[] = [
  {
    slug: "nethercommand",
    name: "NetherCommand",
    path: "/nethercommand/",
    accent: "#8fb0ff",
    visual: "command",
    category: "AI OPERATIONS",
    status: "In development",
    title: "NetherCommand: AI Agent Command Center",
    description: "A command center for teams running AI agents: agent work, hardware health and decisions that need a person, in one read-only view. In development.",
    summary: "One read-only command center for agent work, hardware health and the decisions that need a person.",
    h1: "The command center for AI agents and the hardware they run on.",
    lead: "When work is spread across many agents, models and machines, status hides in logs and chat threads. NetherCommand brings the work, the hardware and the decisions waiting on people into one calm view.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    ogImage: "/og/nethercommand.jpg",
    ogAlt: "NetherCommand: the command center for AI agents and the hardware they run on",
    problem: {
      heading: "Agent work is easy to start and hard to see.",
      points: [
        { title: "Status is scattered", copy: "Agent progress lives in chat threads, issue trackers and logs. Finding out what is blocked means asking around." },
        { title: "Hardware hides its problems", copy: "A stalled GPU node or a stale data feed looks the same as a quiet one until someone goes looking." },
        { title: "Decisions get buried", copy: "The few items that need a human decision sit next to hundreds that do not." },
      ],
    },
    how: {
      heading: "From scattered signals to one overview.",
      steps: [
        { title: "Read the systems you already run", copy: "NetherCommand reads your issue tracker, machine telemetry and agent activity. The current version only reads; it does not change them." },
        { title: "Start from what needs attention", copy: "The Overview leads with blocked work, machines that stopped reporting and items waiting on a person, then one live tile per area." },
        { title: "Go from summary to detail fast", copy: "A sidebar, a Cmd/Ctrl-K command palette and deep links take you from the summary to the exact machine or issue." },
        { title: "Know when data is stale", copy: "Every screen shows whether its feed is loading, live, stale, down or rejected, so nothing on screen is a guess." },
      ],
    },
    today: {
      working: [
        "Nether Labs runs on it every day; we are its first customer.",
        "App shell with sidebar, command palette, Overview and 14 routed screens.",
        "Fleet view of our AI hardware, refreshed every five minutes.",
        "Timeline (Gantt) of all tracked work, from product down to individual issue.",
        "Explicit loading, stale, down and rejected states on every screen.",
      ],
      next: [
        "Not available for use outside Nether Labs yet.",
        "Connectors are built for our own stack; other tools are being scoped.",
        "No pricing has been set.",
      ],
    },
    faqs: [
      { q: "What is NetherCommand?", a: "A command center web app for organizations that run AI agents on their own hardware. It shows agent work, machine health and the items that need a human decision in one read-only view." },
      { q: "Can I use NetherCommand today?", a: earlyAccess },
      { q: "Does NetherCommand change my systems?", a: "No. The current version is read-only. It reads feeds and shows state; actions stay in the tools you already use." },
      { q: "Which hardware does it monitor?", a: "Today it monitors the machines we operate: NVIDIA GB10-based systems, Apple Mac Studio computers and a GPU workstation. Support for other hardware will follow what early-access teams run." },
      { q: "How is it different from a monitoring dashboard?", a: "Monitoring dashboards show metrics. NetherCommand is organized around work and decisions: what is moving, what is blocked and what needs you, with hardware health as context." },
    ],
  },
  {
    slug: "nethershield-guard",
    name: "NetherShield Guard",
    path: "/nethershield-guard/",
    accent: "#5fd6a0",
    visual: "shield",
    category: "AI AGENT SECURITY",
    status: "In development",
    title: "NetherShield Guard: AI Agent Security for Your Machine",
    description: "NetherShield Guard audits a computer for the ways an AI agent could be turned against you and explains each fix. Runs locally. Linux today; macOS in progress.",
    summary: "A local security audit for machines that run AI agents, MCP servers and local models.",
    h1: "Security for computers that run AI agents.",
    lead: "AI agents, MCP servers and local models get real access to your files, keys and shell. NetherShield Guard checks how that access could be abused on your machine and shows how to close each path. It runs on your machine; nothing is uploaded.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux",
    ogImage: "/og/nethershield-guard.jpg",
    ogAlt: "NetherShield Guard: security for computers that run AI agents",
    problem: {
      heading: "Your machine was not set up for an agent with a shell.",
      points: [
        { title: "Agents inherit your access", copy: "An agent that can run commands can usually read the same SSH keys, cloud credentials and tokens you can." },
        { title: "Small gaps chain together", copy: "A broad sudo rule, an exposed model server and a plaintext token are minor alone. Together they can put root one prompt injection away." },
        { title: "Most tools look elsewhere", copy: "Enterprise security products focus on managed fleets. Developer laptops and home GPU servers are largely left to their owners." },
      ],
    },
    how: {
      heading: "Audit, connect the dots, then fix with undo.",
      steps: [
        { title: "Audit, read-only", copy: "A local scan covers AI agents and MCP servers, privileges, secrets, remote access, network exposure, sharing, patching, persistence and hardening." },
        { title: "Connect the dots", copy: "Attack-chain rules link individual findings into the paths an attacker could actually use, with a score you can recompute by hand." },
        { title: "Fix, with undo", copy: "Guided fixes for low- and medium-risk issues, each backed up, verified by re-running the check and reversible.", planned: true },
        { title: "Keep watching", copy: "Continuous local monitoring for new listeners, startup items, key changes and decoy credentials being read.", planned: true },
      ],
    },
    today: {
      working: [
        "Read-only audit command-line tool: 18 checks across 11 categories and 5 attack-chain rules.",
        "Local scan history with diffs, a loopback-only API and a JSON report format.",
        "Automated test suite, including checks that fixture secrets are excluded from reports.",
        "Used on our own Linux machines.",
      ],
      next: [
        "Guided, reversible fixes and continuous monitoring are in development.",
        "macOS checks are written but not yet tested on a real Mac; Windows comes later.",
        "No public download, signed release or pricing yet.",
      ],
    },
    faqs: [
      { q: "What is NetherShield Guard?", a: "A security tool for computers that run AI agents, MCP servers and local models. It audits how an agent's access to your machine could be abused, links findings into attack chains and explains how to close each one." },
      { q: "Is it an antivirus?", a: "Not in the traditional sense. It does not depend on malware signatures. It looks at how your machine is configured for AI agents and where that configuration could be abused, and can use established open-source scanners where they help." },
      { q: "Does it upload my data?", a: "No. Scans run on your machine and results stay there. There is no cloud scanning." },
      { q: "Will it change my system?", a: "The current version only reads. Planned fixes will show the change first, keep a backup, verify the result and be reversible." },
      { q: "Which systems are supported?", a: "Linux today, tested on our own machines. macOS support is in progress and has not yet been tested on a real Mac. Windows is planned after that." },
      { q: "Can I try NetherShield Guard?", a: earlyAccess },
    ],
  },
  {
    slug: "netherenvoy",
    name: "NetherEnvoy",
    path: "/netherenvoy/",
    accent: "#f6a66a",
    visual: "envoy",
    category: "PRIVATE VOICE",
    status: "In development",
    title: "NetherEnvoy: Private Voice Assistant for AI Agents",
    description: "NetherEnvoy is a private voice interface for your AI agents, with replies spoken by a voice model running on your own hardware. In development.",
    summary: "A private voice interface for the agents you already run, with speech generated on your own hardware.",
    h1: "A private voice assistant for the AI agents you already run.",
    lead: "Talk to your agents the way you would talk to a chief of staff. NetherEnvoy turns speech into requests for your existing agents and answers in a natural voice synthesized on your own hardware. The goal is an assistant where sensitive work never has to leave the building.",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "macOS",
    ogImage: "/og/netherenvoy.jpg",
    ogAlt: "NetherEnvoy: a private voice assistant for the AI agents you already run",
    problem: {
      heading: "Voice assistants were built for timers, not for real work.",
      points: [
        { title: "Hosted by default", copy: "Most assistants send your voice to someone else's servers, which rules them out for finance, security and client work." },
        { title: "Cut off from your agents", copy: "Consumer assistants cannot reach the agents, tools and data your team actually uses." },
        { title: "Hard to trust", copy: "An assistant should say when it is still working, separate facts from guesses and never read private information aloud." },
      ],
    },
    how: {
      heading: "Your agents, with a voice you control.",
      steps: [
        { title: "Speak naturally", copy: "Ask in plain language. The design uses local speech recognition and lets you interrupt an answer.", planned: true },
        { title: "Route to your agents", copy: "Requests go to the agents and tools you already run, instead of to a separate assistant with its own memory." },
        { title: "Hear a local voice", copy: "Replies are synthesized on your own hardware with an open-weight speech model and a licensed stock voice." },
        { title: "Fail closed", copy: "A spoken-content guard blocks sensitive categories, and if the local voice is down the reply arrives as text instead of using a hosted fallback." },
      ],
    },
    today: {
      working: [
        "Spoken replies from our agents, synthesized on a local Mac Studio, in daily use inside Nether Labs since October 2026.",
        "A spoken-content guard that blocks sensitive categories before synthesis.",
        "No silent hosted voice fallback.",
        "Conversation from a phone over a private network connection, used internally.",
      ],
      next: [
        "Wake-word detection, streaming conversation and interruption are in development.",
        "English works today; French quality needs more work.",
        "Not available outside Nether Labs; no pricing.",
      ],
    },
    faqs: [
      { q: "What is NetherEnvoy?", a: "A voice interface for an organization's AI agents. You speak a request, your existing agents do the work, and the answer is spoken back in a voice generated on your own hardware." },
      { q: "Does my voice leave my machine?", a: "Today, speech synthesis runs on local hardware. Where audio and text go otherwise depends on the speech recognition, the agent's model provider and the delivery channel you use, such as a messaging app. Keeping capture and sensitive material fully local, with no silent hosted fallback, is a design goal for the first release, not a finished feature." },
      { q: "Which languages does it support?", a: "English today. French is a goal for the first release, and its quality is still being improved." },
      { q: "Does NetherEnvoy clone voices?", a: "No. It uses a licensed stock voice and does not clone any real person's voice." },
      { q: "Can I try NetherEnvoy?", a: earlyAccess },
    ],
  },
  {
    slug: "netherfuse",
    name: "NetherFuse",
    path: "/netherfuse/",
    accent: "#c3a6ff",
    visual: "fuse",
    category: "LOCAL INFERENCE",
    status: "Early research",
    title: "NetherFuse: One Model Across Mac Studio and DGX Spark",
    description: "NetherFuse is software to run one AI model across a Mac Studio and NVIDIA DGX Spark systems over a fast network link. Early research; no benchmarks claimed.",
    summary: "Software to run one model across a Mac Studio and NVIDIA DGX Spark systems as a single inference system.",
    h1: "Run one AI model across a Mac Studio and NVIDIA DGX Spark.",
    lead: "Apple silicon brings very large unified memory. NVIDIA's GB10 brings fast prompt processing. NetherFuse is the software we are building to make them work as one inference system over a direct high-speed link, with the setup, fallback and monitoring a team can rely on.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux",
    ogImage: "/og/netherfuse.jpg",
    ogAlt: "NetherFuse: run one AI model across a Mac Studio and NVIDIA DGX Spark",
    problem: {
      heading: "Two strong machines, no good way to combine them.",
      points: [
        { title: "Different strengths", copy: "Mac Studio has memory for very large models; DGX Spark systems have CUDA and strong prefill. Most setups use one or the other." },
        { title: "The link is the hard part", copy: "Moving model state between them fast enough needs a low-latency network path that macOS does not provide out of the box." },
        { title: "Research code is not a product", copy: "Early open-source work shows it can be done. Signing, setup, fallback and end-to-end benchmarks are still missing." },
      ],
    },
    how: {
      heading: "The design: prefill on Spark, decode on Mac.",
      steps: [
        { title: "Split the work", copy: "Prompt processing (prefill) will run on DGX Spark systems and token generation (decode) on the Mac, where memory is plentiful.", planned: true },
        { title: "Hand off the cache", copy: "The attention (KV) cache will move from Spark to Mac over a direct high-speed link. We start with TCP and add RDMA only where it measurably helps.", planned: true },
        { title: "Fall back safely", copy: "If the link or a node fails, requests should continue on a single machine instead of failing.", planned: true },
        { title: "Measure end to end", copy: "A benchmark harness will measure full requests on real workloads before we claim any speed-up.", planned: true },
      ],
    },
    today: {
      working: [
        "Architecture, API and data-model specifications (v0.1) for the control plane and gateway.",
        "The upstream RDMA data path imported with its history, license and attribution intact.",
        "Test hardware in house: GB10 systems, a 100 GbE switch and a Thunderbolt 5 network enclosure.",
      ],
      next: [
        "Mac-side bring-up starts when our test Mac Studio arrives.",
        "No performance results yet; we will not quote speed-ups before end-to-end tests.",
        "Not available for installation; no pricing.",
      ],
    },
    faqs: [
      { q: "What is NetherFuse?", a: "Software that makes a Mac Studio and one or more NVIDIA DGX Spark systems work as one inference system: prompt processing on the Spark, token generation on the Mac, with the cache handed off over a fast network link." },
      { q: "How much faster is it?", a: "We have no end-to-end results to publish yet. Public measurements of similar setups show gains at some prompt sizes and parity at others, so we will publish our own numbers only after testing real workloads." },
      { q: "What hardware does it need?", a: "A Mac Studio with Apple silicon, one or more NVIDIA DGX Spark (GB10) systems, and a high-speed network path between them, such as a Thunderbolt 5 PCIe enclosure with a 100 GbE network card." },
      { q: "Is NetherFuse open source?", a: "It builds on Ash Hart's open-source MCDMA driver (Apache-2.0), which we credit. Licensing for NetherFuse itself has not been decided." },
      { q: "Is Nether Labs affiliated with Apple or NVIDIA?", a: "No. NetherFuse is an independent Nether Labs product." },
      { q: "Can I try NetherFuse?", a: "Not yet. It is in early research. If you run Mac Studio and DGX Spark hardware together, use the contact form to tell us about your setup." },
    ],
    credit: "NetherFuse builds on the original idea and open-source work of Ash Hart's MCDMA project, a native macOS RDMA driver released under the Apache-2.0 license. NetherFuse is an independent Nether Labs product and is not affiliated with or endorsed by that project.",
    legal: "Mac Studio is a trademark of Apple Inc. NVIDIA and DGX Spark are trademarks of NVIDIA Corporation. Nether Labs is not affiliated with Apple or NVIDIA.",
  },
];

export const netherforgeCard = {
  name: "NetherForge",
  path: "/netherforge/",
  accent: "#a3f2d5",
  category: "AGENT ORGANIZATION",
  status: "In development",
  summary: "A managed operating environment that connects workflows, knowledge, agents, governance and human authority.",
} as const;

export function getProduct(slug: ProductSlug): Product {
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown product ${slug}`);
  return product;
}
