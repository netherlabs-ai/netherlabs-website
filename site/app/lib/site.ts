import type { Metadata } from "next";

export const siteOrigin = "https://netherlabs.ai";
export const siteName = "Nether Labs";
export const contactEmail = "hello@netherlabs.ai";

export const publicRoutes = [
  "/",
  "/about/",
  "/workflow-audit/",
  "/netherforge/",
  "/contact/",
  "/privacy/",
] as const;

export const navigation = [
  { label: "Workflow diagnostic", href: "/workflow-audit/" },
  { label: "NetherForge", href: "/netherforge/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

type MetadataInput = {
  title: string;
  description: string;
  path: (typeof publicRoutes)[number];
};

export function buildMetadata({ title, description, path }: MetadataInput): Metadata {
  const canonical = new URL(path, siteOrigin).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/hero-factory-enhanced-1920.webp",
          width: 1920,
          height: 1080,
          alt: "Robotic arms working across a luminous city-like operating system",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero-factory-enhanced-1920.webp"],
    },
  };
}

export const auditSteps = [
  {
    number: "01",
    title: "Map",
    output: "Current-state workflow map",
    copy: "See how the work actually moves across people, systems, data, decisions and exceptions.",
  },
  {
    number: "02",
    title: "Measure",
    output: "Friction baseline",
    copy: "Make delay, rework, skilled-time consumption and operational drag visible before proposing technology.",
  },
  {
    number: "03",
    title: "Score",
    output: "Opportunity scorecard",
    copy: "Rank candidate workflows against value, feasibility, evidence, ownership and implementation readiness.",
  },
  {
    number: "04",
    title: "Control",
    output: "Governance model",
    copy: "Define data boundaries, human review, authority, privacy, escalation and final accountability.",
  },
  {
    number: "05",
    title: "Roadmap",
    output: "Pilot charter + 90-day path",
    copy: "Turn the strongest opportunity into a controlled first-pilot recommendation leadership can act on.",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Accountable roles",
    copy: "Agents behave like accountable role-holders instead of interchangeable chat windows.",
  },
  {
    number: "02",
    title: "Operating procedures",
    copy: "Work becomes repeatable, inspectable and improvable across the organization.",
  },
  {
    number: "03",
    title: "Dispatch system",
    copy: "Specialists act as one organization rather than a collection of disconnected automations.",
  },
  {
    number: "04",
    title: "Visible recovery",
    copy: "The organization becomes more resilient as its workflows and tooling evolve.",
  },
] as const;

export const stackLayers = [
  ["L1", "Business strategy", "Priorities, value and ownership"],
  ["L2", "Knowledge & data", "Context, access and memory"],
  ["L3", "Models & infrastructure", "Routing, privacy and resilience"],
  ["L4", "Agents & orchestration", "Roles, handoffs and human checks"],
  ["L5", "Governance & operations", "Evaluation, audit and control"],
] as const;

export const phases = [
  ["01", "Audit", "See the work as it really happens and identify the first workflow worth redesigning."],
  ["02", "Build", "Implement one controlled workflow and test it against the real examples that define success."],
  ["03", "Operate", "Monitor outcomes, exceptions, governance, adoption and the points where people retain authority."],
  ["04", "Compound", "Measure quality, cost and risk. Harden what works, remove what does not and expand with evidence."],
] as const;

export const intakeEndpoint = "/.netlify/functions/intake-form";
export type IntakePayload = {
  name: string;
  email: string;
  company: string;
  timing: "Now" | "This quarter" | "Exploring";
  workflow: string;
  challenge: string;
  source: "contact-page" | "homepage-drawer";
};

export function buildDiagnosticBrief(payload: IntakePayload) {
  return [
    "NETHER LABS | WORKFLOW DIAGNOSTIC REQUEST", "",
    `Name: ${payload.name}`, `Work email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`, `Timing: ${payload.timing}`,
    `Workflow or process: ${payload.workflow || "Not provided"}`, `Source: ${payload.source}`, "",
    "What makes this workflow difficult today:", payload.challenge,
  ].join("\n");
}

export async function submitIntake(payload: IntakePayload) {
  const response = await fetch(intakeEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Intake function returned ${response.status}`);
  const result = await response.json() as { success?: boolean; message?: string };
  if (result.success !== true) throw new Error(result.message || "Intake function did not acknowledge delivery");
  return result;
}
