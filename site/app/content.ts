// Homepage content. Every claim must be provable today: NetherGuard v0.2 is a release candidate for Mac (Apple silicon)
// and Windows (x64), read-only, unsigned, not open source, with no customers yet. Evidence and competitor sources:
// engineering/state/ai-security-refocus-20261126/POSITIONING.md.

export const exposures = [
  {
    label: "AI connectors",
    short: "Connectors",
    title: "Connectors quietly widen what an assistant can touch.",
    description: "Claude, ChatGPT, Cursor and VS Code can be wired to MCP servers and connectors that read folders, run commands or reach your accounts. Most are set up once and never looked at again.",
    steps: ["Prompt arrives", "Assistant calls a connector", "Connector runs with your access", "Result leaves the machine"],
    risk: "Broad file, shell or account access, added months ago and forgotten.",
    shows: "Every connector NetherGuard finds, what it runs, and which ones look risky.",
    boundary: "You decide which connectors stay. NetherGuard explains how to remove the rest.",
  },
  {
    label: "Keys and tokens",
    short: "Keys",
    title: "Anything you can read, your assistant can read too.",
    description: "API keys, cloud credentials and passwords end up in config files, dotfiles and synced folders. An agent that runs with your access can read them as easily as you can.",
    steps: ["Agent reads a file", "Finds a saved key", "Key is used elsewhere", "Bill or breach follows"],
    risk: "Secrets saved in plain files, sometimes inside folders that sync to the cloud.",
    shows: "Where each secret sits, by name and location only. The value never appears in the report.",
    boundary: "You move or rotate the key. NetherGuard tells you which ones and why.",
  },
  {
    label: "Agents that act alone",
    short: "Autonomy",
    title: "Some assistants act without asking first.",
    description: "Coding agents and desktop assistants can be set to run commands or edit files without a confirmation. That is convenient until a web page or document carries instructions meant for the agent.",
    steps: ["Agent opens a page", "Hidden instruction", "Command runs unasked", "Files change or leak"],
    risk: "Auto-approve settings that turn one injected prompt into a real action.",
    shows: "Which tools are set to act without asking, and how that combines with what they can reach.",
    boundary: "You choose where autonomy is worth it. NetherGuard shows the risk.",
  },
  {
    label: "The machine around it",
    short: "Machine",
    title: "Small gaps chain into one real path.",
    description: "A switched-off firewall, missing updates, an unencrypted disk or a browser extension that reads every site are minor alone. Next to an AI tool with real access, they add up.",
    steps: ["Weak setting", "AI tool with access", "Second weak setting", "Open path"],
    risk: "Separate findings that nobody connects until they are used together.",
    shows: "How findings combine into attack paths. Fixing any one link breaks the chain.",
    boundary: "The report ranks what to fix first.",
  },
];

export const guardSteps = [
  {
    title: "Scan",
    output: "A read-only look at your AI layer",
    copy: "NetherGuard reads the AI tools, connectors, keys, browser extensions and security settings on this computer. It takes about a minute and only reads.",
    decision: "What AI is on this machine, and what can it reach?",
    signal: "WHAT NETHERGUARD READS",
    nodes: ["AI APPS", "CONNECTORS", "KEYS", "EXTENSIONS"],
    planned: false,
  },
  {
    title: "Rank",
    output: "Fix these first",
    copy: "Findings are ranked by what matters most. Each one says, in plain language, why it matters and how to fix it.",
    decision: "What should I fix tonight?",
    signal: "HOW IT IS SORTED",
    nodes: ["FIX FIRST", "COMBINED", "WORTH FIXING", "PASSED"],
    planned: false,
  },
  {
    title: "Connect",
    output: "How these problems combine",
    copy: "NetherGuard links separate findings into the paths an attacker could actually use, such as an injected prompt reaching a key saved in plain text.",
    decision: "Which single fix breaks the most dangerous chain?",
    signal: "ATTACK PATHS",
    nodes: ["PROMPT", "AGENT", "KEY", "EXIT"],
    planned: false,
  },
  {
    title: "Watch",
    output: "A monitor that stays on",
    copy: "Next: NetherGuard runs in the menu bar or tray, notices when a new connector, key or risky setting appears, and tells you in plain language. Fixes will be one click and reversible.",
    decision: "Did anything change since last time?",
    signal: "IN DEVELOPMENT",
    nodes: ["MONITOR", "ALERT", "FIX", "UNDO"],
    planned: true,
  },
];

export const aiLayer = [
  {
    id: "apps",
    number: "L1",
    title: "AI apps and agents",
    mobileTitle: "Apps",
    detail: "Desktop assistants, coding agents and AI helpers in the browser. The tools that take instructions in plain language.",
    tags: ["Claude", "ChatGPT", "Cursor", "VS Code"],
  },
  {
    id: "connectors",
    number: "L2",
    title: "Connectors and MCP servers",
    mobileTitle: "Connectors",
    detail: "The bridges that let an assistant read folders, run commands and reach other services on your behalf.",
    tags: ["MCP", "Plugins", "Auto-approve"],
  },
  {
    id: "secrets",
    number: "L3",
    title: "Keys and credentials",
    mobileTitle: "Keys",
    detail: "API keys, tokens and passwords saved where an agent with your access can read them.",
    tags: ["API keys", "Tokens", "Synced folders"],
  },
  {
    id: "browser",
    number: "L4",
    title: "Browser extensions",
    mobileTitle: "Browser",
    detail: "Extensions, including AI helpers, that can read and change every website you visit.",
    tags: ["Site access", "AI helpers"],
  },
  {
    id: "machine",
    number: "L5",
    title: "The machine itself",
    mobileTitle: "Machine",
    detail: "The settings that decide how far a misused AI tool can get: encryption, firewall, updates, antivirus and, on a Mac, what is open to the network.",
    tags: ["Encryption", "Firewall", "Updates", "Antivirus"],
  },
];

export const commandFeatures = [
  {
    title: "Where the work stands",
    condition: "When many agents work at once, progress hides in chat threads, trackers and logs.",
    build: "One overview leads with blocked work, stalled machines and the items waiting on a person.",
    outcome: "You see what your agents are doing without asking around.",
    signal: "Activity → one overview",
  },
  {
    title: "Decisions that need you",
    condition: "The few calls that need a human sit next to hundreds that do not.",
    build: "Needs-you collects those decisions in one place. Your answers are recorded back to the tracker.",
    outcome: "Agents keep moving, and people keep the consequential calls.",
    signal: "Decision → recorded",
  },
  {
    title: "Honest status",
    condition: "A quiet dashboard can mean all is well, or that a feed died hours ago.",
    build: "Every screen says whether its data is loading, live, stale, down or rejected.",
    outcome: "Nothing on screen is a guess.",
    signal: "Feed → stated freshness",
  },
];

export const faqs = [
  {
    q: "What does Nether Labs do?",
    a: "We build security for the AI layer: the AI tools and agents on your computer, the connectors they use, the keys they can read and the settings around them. Our flagship is NetherGuard, which shows what the AI on your Mac or PC can reach and do.",
  },
  {
    q: "Is NetherGuard an antivirus?",
    a: "No, and it does not replace one. It runs alongside Microsoft Defender, XProtect or your current antivirus, and it covers what most antivirus does not report on: AI tools, their connectors, the keys they can read and how those combine with your machine's settings.",
  },
  {
    q: "Does my data leave my computer?",
    a: "No. The scan runs on your computer and the report is saved there. NetherGuard sends nothing anywhere, and secret values never appear in the report.",
  },
  {
    q: "Which computers does it support?",
    a: "The v0.2 release candidate runs on Macs with Apple silicon and on Windows PCs (x64). Linux is planned later.",
  },
  {
    q: "Can I try it today?",
    a: "Early access is by request. The current builds are not yet code-signed, so macOS and Windows ask you to confirm before the first run; early-access users get written install steps. Request access through the form and tell us what AI tools you use.",
  },
  {
    q: "Is NetherGuard open source?",
    a: "No. NetherGuard is a single program built only from Go's standard library, with no third-party dependencies.",
  },
  {
    q: "How is this different from enterprise AI security?",
    a: "Large security platforms now inventory AI agents across company fleets and report to an IT or security team. NetherGuard is built for the person at the keyboard: one app on your own Mac or PC, one page in plain language, nothing uploaded.",
  },
];
