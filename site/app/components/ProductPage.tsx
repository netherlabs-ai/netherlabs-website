import type { CSSProperties } from "react";
import Link from "next/link";
import StaticShell from "./StaticShell";
import ProductVisual from "./ProductVisual";
import JsonLd from "./JsonLd";
import { products, type Product } from "../lib/products";
import { breadcrumbs, faqPage, graph, softwareApplication } from "../lib/structured-data";
import "./product.css";

const statusDate = "November 7, 2026";

export function SectionLabel({ n, children }: { n: string; children: string }) {
  return <p className="pp-label"><span>{n}</span>{children}</p>;
}

export default function ProductPage({ product }: { product: Product }) {
  const related = products.filter((item) => item.slug !== product.slug);
  const accessHref = `/contact/?product=${product.slug}`;

  return (
    <StaticShell>
      <JsonLd data={graph(
        softwareApplication(product),
        breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products/" }, { name: product.name, path: product.path }]),
        faqPage(product.path, product.faqs),
      )} />
      <div className="product-page" style={{ "--accent": product.accent } as CSSProperties}>
        <section className="pp-hero" aria-labelledby="pp-title">
          <div className="page-shell pp-hero-grid">
            <div className="pp-hero-copy">
              <nav className="pp-crumbs pp-in" aria-label="Breadcrumb">
                <ol><li><Link href="/" prefetch={false}>Home</Link></li><li><a href="/products/">Products</a></li><li aria-current="page">{product.name}</li></ol>
              </nav>
              <p className="pp-meta pp-in" style={{ "--i": 1 } as CSSProperties}><span className="pp-pill"><i aria-hidden="true" />{product.status}</span><span>{product.name.toUpperCase()} / {product.category}</span></p>
              <h1 id="pp-title" className="pp-rise">{product.h1}</h1>
              <p className="pp-lead pp-rise" style={{ "--i": 2 } as CSSProperties}>{product.lead}</p>
              <div className="pp-actions pp-in" style={{ "--i": 3 } as CSSProperties}>
                <a className="pp-btn pp-btn-primary" href={accessHref}>Join the early-access list <span aria-hidden="true">↗</span></a>
                <a className="pp-btn pp-btn-ghost" href="#how">How it works <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <figure className="pp-visual pp-in" style={{ "--i": 4 } as CSSProperties}>
              <ProductVisual kind={product.visual} />
              <figcaption><span>{product.name.toUpperCase()}</span><span>ILLUSTRATIVE DIAGRAM</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="pp-section" aria-labelledby="pp-problem">
          <div className="page-shell">
            <SectionLabel n="01">THE PROBLEM</SectionLabel>
            <h2 id="pp-problem">{product.problem.heading}</h2>
            <div className="pp-points">
              {product.problem.points.map((point) => <article key={point.title}><h3>{point.title}</h3><p>{point.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="pp-section" id="how" aria-labelledby="pp-how">
          <div className="page-shell">
            <SectionLabel n="02">HOW IT WORKS</SectionLabel>
            <h2 id="pp-how">{product.how.heading}</h2>
            <ol className="pp-steps">
              {product.how.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="pp-step-meta"><span>0{index + 1}</span>{step.planned ? <span className="pp-tag">PLANNED</span> : null}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pp-section" aria-labelledby="pp-today">
          <div className="page-shell">
            <SectionLabel n="03">WHAT IS REAL TODAY</SectionLabel>
            <h2 id="pp-today">What works now, and what does not yet.</h2>
            <div className="pp-status">
              <div className="pp-status-card pp-status-live">
                <p className="pp-status-head"><span className="pp-dot" aria-hidden="true" />WORKING TODAY</p>
                <ul>{product.today.working.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="pp-status-card">
                <p className="pp-status-head"><span className="pp-dot pp-dot-muted" aria-hidden="true" />NOT YET</p>
                <ul>{product.today.next.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <p className="pp-footnote">Status as of {statusDate}. We update this page when something ships, not before.</p>
            {product.credit ? <p className="pp-credit"><span>CREDIT</span>{product.credit}</p> : null}
          </div>
        </section>

        <section className="pp-section" aria-labelledby="pp-faq">
          <div className="page-shell pp-faq-grid">
            <div>
              <SectionLabel n="04">QUESTIONS</SectionLabel>
              <h2 id="pp-faq">{product.name}, answered.</h2>
            </div>
            <div className="pp-faq">
              {product.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary><span>{faq.q}</span><span className="pp-faq-icon" aria-hidden="true">+</span></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="pp-cta" aria-labelledby="pp-cta-title">
          <div className="page-shell pp-cta-inner">
            <div>
              <p className="pp-label"><span>05</span>EARLY ACCESS</p>
              <h2 id="pp-cta-title">Interested in <em>{product.name}</em>?</h2>
              <p>There is no external release yet. Join the early-access interest list, tell us what you run and what you need, and we will reach out when there is something real to try.</p>
            </div>
            <div className="pp-actions">
              <a className="pp-btn pp-btn-primary" href={accessHref}>Join the early-access list <span aria-hidden="true">↗</span></a>
              <a className="pp-btn pp-btn-ghost" href="/products/">All products</a>
            </div>
          </div>
        </section>

        <section className="pp-section pp-related" aria-labelledby="pp-related">
          <div className="page-shell">
            <SectionLabel n="06">ALSO FROM NETHER LABS</SectionLabel>
            <h2 id="pp-related" className="pp-visually-small">More products in development</h2>
            <ul className="pp-related-list">
              {related.map((item) => (
                <li key={item.slug} style={{ "--accent": item.accent } as CSSProperties}>
                  <a href={item.path}><span className="pp-related-name"><span className="pp-dot" aria-hidden="true" />{item.name}</span><span>{item.summary}</span><span aria-hidden="true" className="pp-arrow">→</span></a>
                </li>
              ))}
            </ul>
            {product.legal ? <p className="pp-legal">{product.legal}</p> : null}
          </div>
        </section>
      </div>
    </StaticShell>
  );
}
