import { products } from "../lib/products";
import { contactEmail, siteOrigin } from "../lib/site";

export const dynamic = "force-static";

// llmstxt.org summary for AI assistants and answer engines.
export function GET() {
  const url = (path: string) => new URL(path, siteOrigin).toString();
  const body = [
    "# Nether Labs",
    "",
    "> Nether Labs (Ottawa, Canada) is an AI security company building security for the AI layer: the AI tools and agents on a computer, the connectors (MCP servers) they use, the keys they can read and the settings around them. The flagship, NetherShield Guard, shows what the AI on a Mac or Windows PC can reach and do, on one page. Guard v0.2 is a release candidate with early access by request; builds are not yet code-signed, it is not open source, and there is no public pricing.",
    "",
    "## Security products",
    "",
    ...products.filter((product) => product.line === "security").map((product) => `- [${product.name}](${url(product.path)}): ${product.summary} Status: ${product.status}.`),
    "",
    "## Lab projects (no external release yet)",
    "",
    ...products.filter((product) => product.line === "lab").map((product) => `- [${product.name}](${url(product.path)}): ${product.summary} Status: ${product.status}.`),
    "",
    "## Contact",
    "",
    `- [Early access and contact](${url("/contact/")}): NetherShield Guard early-access requests and general questions.`,
    `- Email: ${contactEmail}`,
    "",
    "## Optional",
    "",
    `- [Products overview](${url("/products/")})`,
    `- [About Nether Labs](${url("/about/")})`,
    `- [Privacy](${url("/privacy/")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
