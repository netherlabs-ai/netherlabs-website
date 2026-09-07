export const capabilities = [
  {
    id: "01",
    title: "Accountable roles",
    mobileTitle: "Roles",
    condition: "Reliable agent workflows need explicit roles, shared context and clear decision boundaries.",
    build:
      "Steward is designed to give each agent a defined purpose, context, authority and relationship to the rest of the organization.",
    outcome: "Agents behave like accountable role-holders instead of interchangeable chat windows.",
    signal: "Identity → accountable role",
  },
  {
    id: "02",
    title: "Operating procedures",
    mobileTitle: "Procedures",
    condition: "A capable agent still fails when the work itself remains undefined.",
    build:
      "SOPs make responsibilities, handoffs, review gates and completion standards explicit across real workflows.",
    outcome: "Work becomes repeatable, inspectable and improvable across the organization.",
    signal: "Intent → repeatable execution",
  },
  {
    id: "03",
    title: "Dispatch system",
    mobileTitle: "Dispatch",
    condition: "Multiple agents create noise when no system owns prioritization and coordination.",
    build:
      "Steward is being designed to route work to the right roles, coordinate dependencies and return outputs for human review.",
    outcome: "Specialists act as one organization rather than a collection of disconnected automations.",
    signal: "Mission → coordinated action",
  },
  {
    id: "04",
    title: "Visible recovery",
    mobileTitle: "Recovery",
    condition: "Long-running systems degrade when errors, drift and broken dependencies stay invisible.",
    build:
      "We are designing recovery around visible errors, preserved context and clear escalation when human intervention is needed.",
    outcome: "The organization becomes more resilient as its workflows and tooling evolve.",
    signal: "Failure → visible recovery",
  },
];

export const layers = [
  {
    id: "strategy",
    number: "L1",
    title: "Business strategy",
    mobileTitle: "Strategy",
    detail:
      "The system begins with the decisions, constraints and outcomes that matter, not with a model shortlist.",
    tags: ["Priorities", "Value", "Ownership"],
  },
  {
    id: "knowledge",
    number: "L2",
    title: "Knowledge & data",
    mobileTitle: "Knowledge",
    detail:
      "Institutional context becomes usable, permissioned and traceable across the workflows that need it.",
    tags: ["Context", "Access", "Memory"],
  },
  {
    id: "models",
    number: "L3",
    title: "Models & infrastructure",
    mobileTitle: "Models",
    detail:
      "Work is routed across the right cloud, local or hybrid resources for quality, privacy, speed and cost.",
    tags: ["Routing", "Privacy", "Resilience"],
  },
  {
    id: "agents",
    number: "L4",
    title: "Agents & orchestration",
    mobileTitle: "Agents",
    detail:
      "Specialist agents coordinate around roles and processes, with human judgment retained where accountability belongs.",
    tags: ["Roles", "Handoffs", "Human checks"],
  },
  {
    id: "governance",
    number: "L5",
    title: "Governance & operations",
    mobileTitle: "Governance",
    detail:
      "Quality, cost, access and failure states remain visible so the system can be operated and improved with confidence.",
    tags: ["Evaluation", "Audit", "Control"],
  },
];

export const auditSteps = [
  {
    number: "01",
    title: "Map",
    output: "Current-state workflow map",
    copy: "See how the work actually moves across people, systems, data, decisions and exceptions.",
    signal: "WORKFLOW TOPOLOGY",
    nodes: ["PEOPLE", "SYSTEMS", "DATA", "EXCEPTIONS"],
  },
  {
    number: "02",
    title: "Measure",
    output: "Friction baseline",
    copy: "Make delay, rework, skilled-time consumption and operational drag visible before proposing technology.",
    signal: "FRICTION TRACE",
    nodes: ["DELAY", "REWORK", "WAIT", "SKILLED TIME"],
  },
  {
    number: "03",
    title: "Score",
    output: "Opportunity scorecard",
    copy: "Rank candidate workflows against value, feasibility, evidence, ownership and implementation readiness.",
    signal: "OPPORTUNITY MODEL",
    nodes: ["VALUE", "FEASIBILITY", "EVIDENCE", "OWNERSHIP"],
  },
  {
    number: "04",
    title: "Control",
    output: "Governance model",
    copy: "Define data boundaries, human review, authority, privacy, escalation and final accountability.",
    signal: "CONTROL BOUNDARY",
    nodes: ["ACCESS", "REVIEW", "AUTHORITY", "ESCALATION"],
  },
  {
    number: "05",
    title: "Roadmap",
    output: "Pilot charter + 90-day path",
    copy: "Turn the strongest opportunity into a controlled first-pilot recommendation leadership can act on.",
    signal: "PILOT SEQUENCE",
    nodes: ["OWNER", "PILOT", "PROOF", "90 DAYS"],
  },
];

export const faqs = [
  {
    q: "What is an AI Workflow Diagnostic?",
    a: "A fixed-scope examination of one agreed workflow. We map how the work moves, establish a friction baseline, rank opportunities, define control requirements and recommend a governed first pilot with a 90-day path.",
  },
  {
    q: "Who is Nether Labs for?",
    a: "Owners, executives and operational leaders in established organizations where repeated workflows consume skilled time, create bottlenecks or constrain service. The strongest fit has a real workflow, an accountable owner, usable evidence and a path to implementation.",
  },
  {
    q: "Does everything need to run locally?",
    a: "No. Cloud, local and hybrid architectures each have a place. The choice depends on sensitivity, performance, control, economics and the work itself.",
  },
  {
    q: "Are you tied to one model or vendor?",
    a: "No. We design around the operating requirement and preserve model optionality so the system can evolve without unnecessary rebuilding.",
  },
  {
    q: "Does the diagnostic obligate us to build?",
    a: "No. The purpose is to create decision-quality evidence. It does not build a production system and creates no obligation to continue into implementation.",
  },
  {
    q: "Where do humans retain authority?",
    a: "Humans retain professional judgment, consequential approvals, exception handling, relationships and final accountability. Autonomy is designed around explicit boundaries rather than assumed everywhere.",
  },
  {
    q: "How do the diagnostic and Steward fit together?",
    a: "A diagnostic examines an agreed workflow and identifies the first controlled improvement. Steward is the broader product pathway for operating workflows, knowledge, governance, metrics and future expansion in one managed environment. Steward is in development. The diagnostic is available independently; implementation is scoped separately.",
  },
];
