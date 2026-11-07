import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import StaticShell from "../components/StaticShell";
import JsonLd from "../components/JsonLd";
import { SectionLabel } from "../components/ProductPage";
import { netherforgeCard, products } from "../lib/products";
import { breadcrumbs, graph, organizationId } from "../lib/structured-data";
import { buildMetadata, siteOrigin } from "../lib/site";
import "../components/product.css";

const title = "Products: Local-First AI Software";
const description = "Software for running AI agents on hardware you control: NetherCommand, NetherShield Guard, NetherEnvoy, NetherFuse and NetherForge. All in development.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/products/",
  image: { url: "/og/products.jpg", alt: "Nether Labs products: software for running AI on hardware you control" },
});

const cards = [
  ...products.map((product) => ({ name: product.name, path: product.path, accent: product.accent, category: product.category, status: product.status, summary: product.summary })),
  netherforgeCard,
];

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
            <p className="pp-meta pp-in" style={{ "--i": 1 } as CSSProperties}><span className="pp-pill"><i aria-hidden="true" />5 products in development</span><span>NETHER LABS / PRODUCTS</span></p>
            <h1 id="hub-title" className="pp-rise">Software for running AI on hardware you control.</h1>
            <p className="pp-lead pp-rise" style={{ "--i": 2 } as CSSProperties}>We build these products for our own operations first, on our own machines, then open them to early-access teams. Each page says plainly what works today and what does not yet.</p>
          </div>
        </section>
        <section className="pp-section" aria-label="Product list">
          <div className="page-shell">
            <ul className="hub-grid">
              {cards.map((card, index) => (
                <li key={card.path} className={`hub-card${index === cards.length - 1 ? " hub-card-wide" : ""}`} style={{ "--accent": card.accent } as CSSProperties}>
                  <a href={card.path}>
                    <span className="hub-card-meta"><span>0{index + 1} / {card.category}</span><span className="pp-pill"><i aria-hidden="true" />{card.status}</span></span>
                    <h2>{card.name}</h2>
                    <p>{card.summary}</p>
                    <span className="hub-card-go">Explore {card.name} <span aria-hidden="true">→</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="pp-cta" aria-labelledby="hub-cta">
          <div className="page-shell pp-cta-inner">
            <div>
              <SectionLabel n="→">EARLY ACCESS</SectionLabel>
              <h2 id="hub-cta">Run agents or AI hardware of your own?</h2>
              <p>Tell us what you operate and which product fits. Early access is limited while these products are in development.</p>
            </div>
            <div className="pp-actions"><a className="pp-btn pp-btn-primary" href="/contact/?product=general">Request early access <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
      </div>
    </StaticShell>
  );
}
