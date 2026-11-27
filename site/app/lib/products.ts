// Product pillar content. Every claim here must stay true and conservative:
// "today" lists only what runs now and "next" lists what is planned or missing.
// NetherGuard v0.2 evidence: engineering/state/guard-ship-v02-20261126/ (STATUS.md, proof/).
// Sources are recorded in engineering/state/growth-20261107/site/RESULT.md.

export type ProductSlug = "nethercommand" | "netherguard" | "netherenvoy" | "netherfuse";
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
  // "security" products lead the site; "lab" projects are listed separately.
  line: "security" | "lab";
  statusDate: string;
  cta: { heading: string; copy: string; button: string };
};

const earlyAccess = "Not yet. It runs inside Nether Labs today and has no external release. Join the early-access interest list through the contact form and tell us about your setup; we will reach out when there is something real to try.";

const labCta = {
  heading: "Interested in this project?",
  copy: "There is no external release yet. Join the early-access interest list, tell us what you run and what you need, and we will reach out when there is something real to try.",
  button: "Join the early-access list",
};

export const products: readonly Product[] = [
  {
    slug: "netherguard",
    name: "NetherGuard",
    path: "/netherguard/",
    accent: "var(--night-muted)",
    visual: "shield",
    category: "AI-LAYER SECURITY",
    status: "v0.2 release candidate",
    title: "NetherGuard: See What Your AI Can Reach",
    description: "NetherGuard shows what the AI tools and agents on your Mac or Windows PC can reach and do, on one page, with a fix for each risk. Nothing is uploaded.",
    summary: "See what the AI tools and agents on your Mac or PC can reach and do, on one page, with the fix for each risk.",
    h1: "See what the AI on your computer can reach.",
    lead: "AI assistants, coding agents and their connectors work with your files, your keys and your shell. NetherGuard reads that AI layer on your Mac or Windows PC and writes a one-page report in plain language: what to fix first, how the risks combine and how to close each one. It runs on your computer and sends nothing anywhere.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "macOS, Windows",
    ogImage: "/og/netherguard.jpg",
    ogAlt: "NetherGuard: see what the AI on your computer can reach",
    problem: {
      heading: "Your computer was not set up for an assistant with your keys.",
      points: [
        { title: "Agents inherit your access", copy: "An assistant that can read files or run commands can usually read the same API keys, cloud credentials and tokens you can." },
        { title: "Connectors widen it quietly", copy: "MCP servers and app connectors give assistants folders, shells and accounts. Most are set up once and never reviewed." },
        { title: "Small gaps chain together", copy: "A key in a plain file, an agent that acts alone and a switched-off firewall are minor apart. Together they can put your data one injected prompt away." },
        { title: "Security tools report elsewhere", copy: "Most antivirus does not report on AI connectors or the keys they can read. The platforms that now inventory AI agents are sold to IT teams and report to an admin console, not to you." },
      ],
    },
    how: {
      heading: "Scan, rank, connect the dots. Then keep watch.",
      steps: [
        { title: "Scan, read-only", copy: "NetherGuard reads the AI layer on this computer: Claude, ChatGPT, Cursor, VS Code and other AI tools, their MCP servers and connectors, keys and tokens in plain files, browser extensions with access to every site, and disk encryption, firewall, updates and antivirus. On a Mac it also checks network exposure, remote login, file sharing, startup items and admin rights." },
        { title: "Rank in plain language", copy: "The one-page report starts with what to fix first. Each finding says what it is, why it matters and the steps to fix it. Secret values never appear, only their name and location." },
        { title: "Connect the dots", copy: "NetherGuard links separate findings into the paths an attacker could use, such as an injected prompt reaching a key saved in plain text, and fixing any one link breaks the chain." },
        { title: "Keep watch", copy: "NetherGuard will run quietly in the menu bar or system tray, notice when a new connector, key or risky setting appears and tell you in plain language.", planned: true },
        { title: "Fix, with undo", copy: "One-click fixes for common issues, each shown before it runs, backed up and reversible.", planned: true },
      ],
    },
    today: {
      working: [
        "v0.2 release candidate for Macs with Apple silicon and Windows PCs (x64), tested on our own Mac and Windows machines on November 26, 2026.",
        "A one-page HTML report in plain language: what to fix first, how the problems combine, and what is worth fixing.",
        "Checks for AI app configs and MCP connectors, assistants set to act without asking, keys and tokens in plain files (including synced folders), browser extensions, disk encryption, firewall, updates and antivirus.",
        "Read-only: apart from saving its report, NetherGuard changes nothing. It sends nothing anywhere, and secret values never appear in the report.",
        "One self-contained program built only from Go's standard library, with no third-party dependencies.",
      ],
      next: [
        "Builds are not yet code-signed, so macOS and Windows ask you to confirm before the first run.",
        "Continuous monitoring, alerts and one-click reversible fixes are in development.",
        "Windows checks for network exposure, remote desktop and local admin accounts are not in v0.2.",
        "Not open source. No public download yet; early access is by request.",
      ],
    },
    faqs: [
      { q: "What is NetherGuard?", a: "A security app for the AI layer of your computer. It shows which AI tools and agents are on your Mac or Windows PC, what they can reach and do, and how to close each risk, on one page in plain language." },
      { q: "Is it an antivirus?", a: "No, and it does not replace one. It runs alongside Microsoft Defender, XProtect or your current antivirus. It covers what most antivirus does not report on: AI tools, their connectors, the keys they can read and how those combine with your machine's settings." },
      { q: "Does it upload my data?", a: "No. The scan runs on your computer and the report is saved there. NetherGuard sends nothing anywhere. Secrets are listed by name and location only; their values never appear in the report." },
      { q: "Will it change my system?", a: "No. v0.2 only reads, apart from saving its report. Planned fixes will show the change first, keep a backup and be reversible." },
      { q: "Which systems are supported?", a: "Macs with Apple silicon and Windows PCs (x64). Linux is planned later." },
      { q: "Why does my computer warn me before it runs?", a: "The early-access builds are not yet code-signed by Apple or Microsoft, so macOS and Windows ask you to confirm once. Early-access users get written install steps and a SHA-256 checksum to verify the download." },
      { q: "Is NetherGuard open source?", a: "No. It is a single program built only from Go's standard library, with no third-party dependencies." },
      { q: "How do I get it?", a: "Request early access through the form. Tell us which AI tools you use and whether you are on Mac or Windows, and we will reach out as places open." },
    ],
    line: "security",
    statusDate: "November 26, 2026",
    cta: {
      heading: "See what the AI on your computer can reach.",
      copy: "Early access is open by request. Tell us which AI tools you use and whether you are on Mac or Windows, and we will reach out with a build and install steps as places open.",
      button: "Request early access",
    },
  },
  {
    slug: "nethercommand",
    name: "NetherCommand",
    path: "/nethercommand/",
    accent: "var(--night-muted)",
    visual: "command",
    category: "AGENT OVERSIGHT",
    status: "In development",
    title: "NetherCommand: Oversight for Your AI Agents",
    description: "NetherCommand gives oversight of your AI agents: what they are working on, what is blocked and the decisions that need a person, in one view. In development.",
    summary: "Oversight of your AI agents: the work in progress, what is blocked and the decisions that need a person.",
    h1: "Oversight for the work your AI agents do.",
    lead: "When work is spread across many agents, models and machines, status hides in logs and chat threads, and the decisions that need a person get buried. NetherCommand brings the work, the machines and the decisions waiting on people into one calm view, so people keep the consequential calls.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    ogImage: "/og/nethercommand.jpg",
    ogAlt: "NetherCommand: oversight for the work your AI agents do",
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
        { title: "Read the systems you already run", copy: "NetherCommand reads your issue tracker, machine telemetry and agent activity. Monitoring screens only read; the one place you act is Needs-you, where an owner's answers are recorded back to the tracker." },
        { title: "Start from what needs attention", copy: "The Overview leads with blocked work, machines that stopped reporting and items waiting on a person, then one live tile per area." },
        { title: "Go from summary to detail fast", copy: "A sidebar, a Cmd/Ctrl-K command palette and deep links take you from the summary to the exact machine or issue." },
        { title: "Know when data is stale", copy: "Every screen shows whether its feed is loading, live, stale, down or rejected, so nothing on screen is a guess." },
      ],
    },
    today: {
      working: [
        "Nether Labs uses it every day to run its own agents.",
        "App shell with sidebar, command palette, Overview and 14 routed screens.",
        "Fleet view of our AI hardware, refreshed every five minutes.",
        "Timeline (Gantt) of all tracked work, from product down to individual issue.",
        "Needs-you: the decisions waiting on a person, answered in the app and recorded back to the tracker.",
        "Explicit loading, stale, down and rejected states on every screen.",
      ],
      next: [
        "Not available for use outside Nether Labs yet.",
        "Connectors are built for our own stack; other tools are being scoped.",
        "No pricing has been set.",
      ],
    },
    faqs: [
      { q: "What is NetherCommand?", a: "A command center web app for organizations that run AI agents on their own hardware. It shows agent work, machine health and the items that need a human decision in one view." },
      { q: "Can I use NetherCommand today?", a: earlyAccess },
      { q: "Does NetherCommand change my systems?", a: "Monitoring screens only read. Needs-you is the exception: the owner answers decisions there, and the answers are recorded back to the tracker. Actions on machines stay in the tools you already use." },
      { q: "Which hardware does it monitor?", a: "Today it monitors the machines we operate: NVIDIA GB10-based systems, Apple Mac Studio computers and a GPU workstation. Support for other hardware will follow what early-access teams run." },
      { q: "How is it different from a monitoring dashboard?", a: "Monitoring dashboards show metrics. NetherCommand is organized around work and decisions: what is moving, what is blocked and what needs you, with hardware health as context." },
      { q: "How does it relate to NetherGuard?", a: "NetherGuard shows what the AI on a computer can reach. NetherCommand shows what your agents are doing with that reach, and which of their decisions need a person." },
    ],
    line: "security",
    statusDate: "November 26, 2026",
    cta: {
      heading: "Want oversight of your own agents?",
      copy: "NetherCommand is not available outside Nether Labs yet. Join the early-access interest list, tell us what agents you run, and we will reach out when there is something real to try.",
      button: "Join the early-access list",
    },
  },
  {
    slug: "netherenvoy",
    name: "NetherEnvoy",
    path: "/netherenvoy/",
    accent: "var(--night-muted)",
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
    line: "lab",
    statusDate: "November 7, 2026",
    cta: labCta,
  },
  {
    slug: "netherfuse",
    name: "NetherFuse",
    path: "/netherfuse/",
    accent: "var(--night-muted)",
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
        "Our test Mac Studio is set up; Mac-side bring-up is next.",
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
    line: "lab",
    statusDate: "November 7, 2026",
    cta: labCta,
  },
];

// NetherForge has no product page yet (/netherforge/ redirects to /products/). It is listed on the Products page
// and in llms.txt only, as in development, with no capability claims beyond what it is for.
export const netherforgeCard = {
  name: "NetherForge",
  category: "AGENT GOVERNANCE",
  status: "In development",
  summary: "A governed workspace for AI agents, with permissions for what each agent may do, change control for what it changes and an audit trail of what it did.",
  note: "No external release yet.",
} as const;

export function getProduct(slug: ProductSlug): Product {
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown product ${slug}`);
  return product;
}
