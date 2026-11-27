import type { Metadata } from "next";

export const siteOrigin = "https://netherlabs.ai";
export const siteName = "Nether Labs";
export const contactEmail = "hello@netherlabs.ai";

// Date of the last meaningful content change per route; feeds sitemap <lastmod>.
export const routeLastModified = {
  "/": "2026-11-26",
  "/products/": "2026-11-26",
  "/nethershield-guard/": "2026-11-26",
  "/nethercommand/": "2026-11-26",
  "/netherenvoy/": "2026-11-07",
  "/netherfuse/": "2026-11-07",
  "/about/": "2026-11-26",
  "/contact/": "2026-11-26",
  "/privacy/": "2026-11-26",
} as const;

export type PublicRoute = keyof typeof routeLastModified;
export const publicRoutes = Object.keys(routeLastModified) as PublicRoute[];

export const navigation = [
  { label: "NetherShield Guard", href: "/nethershield-guard/" },
  { label: "Products", href: "/products/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const productLinks = [
  { label: "NetherCommand", href: "/nethercommand/" },
  { label: "NetherEnvoy", href: "/netherenvoy/" },
  { label: "NetherFuse", href: "/netherfuse/" },
] as const;

export const tagline = "Security for the AI layer.";
export const defaultOgImage = { url: "/og/default.jpg", alt: "Nether Labs: security for the AI layer" };

type MetadataInput = {
  title: string;
  description: string;
  path: PublicRoute;
  image?: { url: string; alt: string };
};

export function buildMetadata({ title, description, path, image = defaultOgImage }: MetadataInput): Metadata {
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
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

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
    "NETHER LABS | EARLY ACCESS / CONTACT REQUEST", "",
    `Name: ${payload.name}`, `Work email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`, `Timing: ${payload.timing}`,
    `Interested in: ${payload.workflow || "Not provided"}`, `Source: ${payload.source}`, "",
    "What they run and want to protect:", payload.challenge,
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
