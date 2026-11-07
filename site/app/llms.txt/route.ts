import { products } from "../lib/products";
import { contactEmail, siteOrigin } from "../lib/site";

export const dynamic = "force-static";

// llmstxt.org summary for AI assistants and answer engines.
export function GET() {
  const url = (path: string) => new URL(path, siteOrigin).toString();
  const body = [
    "# Nether Labs",
    "",
    "> Nether Labs (Ottawa, Canada) helps established businesses find where AI can improve real workflows, starting with a fixed-scope workflow diagnostic, and builds local-first software for running AI agents on hardware you control. All products are in development; none is generally available, and none has public pricing.",
    "",
    "## Services",
    "",
    `- [AI Workflow Diagnostic](${url("/workflow-audit/")}): fixed-scope review of one workflow: map, measure, score, control model and a 90-day pilot roadmap. Available now.`,
    `- [About Nether Labs](${url("/about/")}): founder-led, operator-first approach to AI adoption.`,
    "",
    "## Products (in development, early access by request)",
    "",
    ...products.map((product) => `- [${product.name}](${url(product.path)}): ${product.summary} Status: ${product.status}.`),
    `- [NetherForge](${url("/netherforge/")}): a managed operating environment connecting workflows, knowledge, agents, governance and human authority. Status: In development.`,
    "",
    "## Contact",
    "",
    `- [Contact form](${url("/contact/")}): workflow diagnostic requests and product early access.`,
    `- Email: ${contactEmail}`,
    "",
    "## Optional",
    "",
    `- [Products overview](${url("/products/")})`,
    `- [Privacy](${url("/privacy/")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
