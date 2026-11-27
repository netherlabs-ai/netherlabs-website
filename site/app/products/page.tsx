import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import StaticShell from "../components/StaticShell";
import JsonLd from "../components/JsonLd";
import { SectionLabel } from "../components/ProductPage";
import { products } from "../lib/products";
import { breadcrumbs, graph, organizationId } from "../lib/structured-data";
import { buildMetadata, siteOrigin } from "../lib/site";
import "../components/product.css";

const title = "Products: Security for the AI Layer";
const description = "NetherShield Guard shows what the AI on your Mac or PC can reach and do. NetherCommand gives oversight of the work your AI agents do. Plus two lab projects.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/products/",
  image: { url: "/og/products.jpg", alt: "Nether Labs products: security for the AI layer" },
});

const security = products.filter((product) => product.line === "security");
const lab = products.filter((product) => product.line === "lab");
const cards = [...security, ...lab];

export default function ProductsPage() {
  return (
    <StaticShell>
      <JsonLd data={graph(
        breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products/" }]),
        {
          "@type": "CollectionPage",
          "@id": `${siteOrigin}/products/#page`,
          name: title,
          description,
          url: `${siteOrigin}/products/`,
          publisher: { "@id": organizationId },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, name: card.name, url: `${siteOrigin}${card.path}` })),
          },
        },
      )} />
      <div className="product-page">
        <section className="pp-hero hub-hero" aria-labelledby="hub-title">
          <div className="page-shell">
            <nav className="pp-crumbs pp-in" aria-label="Breadcrumb"><ol><li><Link href="/" prefetch={false}>Home</Link></li><li aria-current="page">Products</li></ol></nav>
            <p className="pp-meta pp-in" style={{ "--i": 1 } as CSSProperties}><span className="pp-pill"><i aria-hidden="true" />Guard v0.2 release candidate</span><span>NETHER LABS / PRODUCTS</span></p>
            <h1 id="hub-title" className="pp-rise">Security for the AI layer.</h1>
            <p className="pp-lead pp-rise" style={{ "--i": 2 } as CSSProperties}>See what the AI on your computer can reach with NetherShield Guard. Oversee what your agents do with NetherCommand. We use both on our own machines, and each page says plainly what works today and what does not yet.</p>
          </div>
        </section>
        <section className="pp-section" aria-labelledby="hub-security">
          <div className="page-shell">
            <SectionLabel n="01">SECURITY FOR THE AI LAYER</SectionLabel>
            <h2 id="hub-security" className="pp-visually-small">Security products</h2>
            <ul className="hub-grid">
              {security.map((card, index) => (
                <li key={card.path} className={`hub-card${index === 0 ? " hub-card-wide" : ""}`} style={{ "--accent": card.accent } as CSSProperties}>
                  <a href={card.path}>
                    <span className="hub-card-meta"><span>{index === 0 ? "FLAGSHIP" : "SUPPORTING"} / {card.category}</span><span className="pp-pill"><i aria-hidden="true" />{card.status}</span></span>
                    <h2>{card.name}</h2>
                    <p>{card.summary}</p>
                    <span className="hub-card-go">Explore {card.name} <span aria-hidden="true">→</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="pp-section pp-related" aria-labelledby="hub-lab">
          <div className="page-shell">
            <SectionLabel n="02">FROM THE LAB</SectionLabel>
            <h2 id="hub-lab" className="pp-visually-small">Lab projects</h2>
            <ul className="pp-related-list">
              {lab.map((item) => (
                <li key={item.slug} style={{ "--accent": item.accent } as CSSProperties}>
                  <a href={item.path}><span className="pp-related-name"><span className="pp-dot" aria-hidden="true" />{item.name}</span><span>{item.summary} {item.status}.</span><span aria-hidden="true" className="pp-arrow">→</span></a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="pp-cta" aria-labelledby="hub-cta">
          <div className="page-shell pp-cta-inner">
            <div>
              <SectionLabel n="→">EARLY ACCESS</SectionLabel>
              <h2 id="hub-cta">See what the AI on your computer can reach.</h2>
              <p>NetherShield Guard early access is open by request for Mac and Windows. Tell us which AI tools you use, and we will reach out as places open. The other products have no external release yet.</p>
            </div>
            <div className="pp-actions"><a className="pp-btn pp-btn-primary" href="/contact/?product=nethershield-guard">Request Guard early access <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
      </div>
    </StaticShell>
  );
}
