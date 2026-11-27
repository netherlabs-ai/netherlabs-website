"use client";

import DiagnosticForm from "./DiagnosticForm";

import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { aiLayer, commandFeatures, exposures, faqs, guardSteps } from "../content";
import CinematicHero from "./CinematicHero";
import InceptionMember from "./InceptionMember";
import { products } from "../lib/products";

const featured = products.filter((product) => product.slug === "netherguard" || product.slug === "nethercommand");

function Arrow({ down = false }: { down?: boolean }) { return <span aria-hidden="true">{down ? "↓" : "↗︎"}</span>; }
function Brand() { return <><span className="brand-mark" aria-hidden="true">N</span><span>NETHER LABS</span></>; }
function Label({ n, children }: { n: string; children: ReactNode }) { return <p className="section-label"><span>{n}</span>{children}</p>; }

function Tabs({ name, labels, children, className = "" }: { name: string; labels: string[]; children: ReactNode[]; className?: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % labels.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + labels.length) % labels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = labels.length - 1;
    else return;
    event.preventDefault(); setActive(next); tabRefs.current[next]?.focus();
  }
  return <div className={`tabs ${className}`}>
    <div className="tab-list" role="tablist" aria-label={({exposure:"Where AI exposure hides",guard:"How NetherGuard works",command:"NetherCommand capabilities",layer:"The AI layer"} as Record<string,string>)[name] || name}>
      {labels.map((label, index) => <button type="button" key={label} ref={el => { tabRefs.current[index] = el; }} id={`${name}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${name}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={e => onKey(e, index)}><span className="tab-number">0{index + 1}</span><span>{label}</span><Arrow /></button>)}
    </div>
    <div className="tab-panels">
      {children.map((child, index) => <div key={labels[index]} id={`${name}-panel-${index}`} role="tabpanel" aria-labelledby={`${name}-tab-${index}`} tabIndex={0} aria-hidden={active !== index} inert={active !== index} className={`tab-panel ${active === index ? "is-active" : ""}`}>{child}</div>)}
    </div>
  </div>;
}

export default function HomeExperience() {
  const briefDialog = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current?.style.setProperty("transform", `scaleX(${Math.min(1, window.scrollY / total)})`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const observer = new ResizeObserver(schedule); observer.observe(document.body); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); observer.disconnect(); };
  }, []);

  const openBrief = () => { menuDialog.current?.close(); briefDialog.current?.showModal(); setContactOpen(true); };

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="reading-progress" ref={progress} aria-hidden="true" />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Nether Labs home"><Brand /></a>
      <nav aria-label="Primary navigation" className="desktop-nav"><a href="#guard">NetherGuard</a><a href="#ai-layer">The AI layer</a><a href="#command">NetherCommand</a><a href="/products/">Products</a></nav>
      <button className="header-cta" aria-haspopup="dialog" aria-controls="early-access" aria-expanded={contactOpen} onClick={() => openBrief()}>Request early access <Arrow /></button>
      <button className="menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => { setMenuOpen(true); menuDialog.current?.showModal(); }}>Menu <span aria-hidden="true">☰</span></button>
    </header>
    <main id="main-content" tabIndex={-1}>
      <CinematicHero contactOpen={contactOpen} onContact={() => openBrief()} />

      <section id="exposure" className="workflows section dark">
        <div className="shell">
          <Label n="01">THE NEW ATTACK SURFACE</Label>
          <div className="section-heading"><h2>Your AI has your keys.<br/><em>Do you know what it can open?</em></h2><p>Every assistant and agent you connect works with some of your access. Most antivirus does not report on it, and the AI tools themselves rarely show it in one place.</p></div>
          <Tabs name="exposure" labels={exposures.map(e => e.label)} className="workflow-tabs">
            {exposures.map(example => <article className="workflow-example" key={example.label}>
              <div className="workflow-description"><span className="eyebrow">{example.label}</span><h3>{example.title}</h3><p>{example.description}</p><button className="text-link" aria-haspopup="dialog" aria-controls="early-access" aria-expanded={contactOpen} onClick={() => openBrief()}>Check your own machine <Arrow /></button></div>
              <div className="workflow-map"><div className="map-caption"><span>ILLUSTRATIVE PATH</span><span>READ-ONLY SCAN</span></div><ol className="flow-nodes">{example.steps.map((step, i) => <li key={step} className={i === 2 ? "review-node" : ""}><span>0{i + 1}</span><strong>{step}</strong>{i === 2 && <small>Where NetherGuard looks</small>}</li>)}</ol><div className="map-notes"><div><span>THE EXPOSURE</span><p>{example.risk}</p></div><div><span>WHAT NETHERGUARD SHOWS</span><p>{example.shows}</p></div></div><p className="human-boundary"><span aria-hidden="true">↳</span>{example.boundary}</p></div>
            </article>)}
          </Tabs>
          <div id="ai-layer" className="system"><div className="system-intro"><p className="eyebrow">WHAT WE MEAN BY THE AI LAYER</p><h3>Five layers.<br/>One machine.</h3><p>The AI layer is everything between your computer and the AI tools you use. NetherGuard reads all five.</p></div><Tabs name="layer" labels={aiLayer.map(l => l.title)} className="system-tabs">{aiLayer.map(layer => <article className="layer-detail" key={layer.id}><span className="layer-number">{layer.number}</span><h4>{layer.title}</h4><p>{layer.detail}</p><div className="tag-row">{layer.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</Tabs></div>
        </div>
      </section>

      <section id="guard" className="diagnostic section paper">
        <div className="shell">
          <Label n="02">NETHERGUARD</Label>
          <div className="diagnostic-heading"><h2>One page.<br/><em>Everything your AI can reach.</em></h2><div><p>NetherGuard reads the AI layer on your Mac or PC and writes a one-page report in plain language: what to fix first, how the problems combine and what is worth fixing.</p><p>It runs on your computer, only reads and sends nothing anywhere. Secrets are reported by name and location, never by value.</p><span className="availability">v0.2 release candidate · Early access by request</span></div></div>
          <Tabs name="guard" labels={guardSteps.map(s => s.title)} className="diagnostic-tabs">
            {guardSteps.map((step, i) => <article className="diagnostic-sheet" key={step.title}>
              <div className="sheet-rail"><span>NETHERGUARD / {step.planned ? "NEXT" : "V0.2"}</span><span>0{i + 1} / 0{guardSteps.length}</span></div>
              <div className="sheet-main"><div className="sheet-copy"><p className="eyebrow">{step.planned ? "IN DEVELOPMENT" : "IN THE REPORT TODAY"}</p><h3>{step.output}</h3><p>{step.copy}</p><div className="deliverable-outcome"><span>THE QUESTION IT ANSWERS</span><strong>{step.decision}</strong></div></div>
              <div className="evidence-card"><div className="evidence-title"><span>{step.signal}</span><span aria-hidden="true">↗</span></div>{step.nodes.map((node,j) => <div className="evidence-row" key={node}><span>0{j+1}</span><strong>{node}</strong><span className="evidence-line" aria-hidden="true" /></div>)}<p>{step.planned ? "Planned. Not in v0.2." : "Runs on your computer. Nothing is uploaded."}</p></div></div>
            </article>)}
          </Tabs>
          <div className="diagnostic-bottom"><div><h3>See your own AI layer.</h3><p>Tell us which AI tools you use and whether you are on Mac or Windows. We will send early-access builds with install steps as places open.</p></div><button className="button dark-button" aria-haspopup="dialog" aria-controls="early-access" aria-expanded={contactOpen} onClick={() => openBrief()}>Request early access <Arrow /></button></div>
          <p className="scope-note">v0.2 is a release candidate. Builds are not yet code-signed, so macOS and Windows ask you to confirm before the first run. NetherGuard is not open source. It works alongside your antivirus and does not replace it.</p>
          <p className="scope-note"><a className="text-link" href="/netherguard/">Read the full NetherGuard page <Arrow /></a></p>
        </div>
      </section>

      <section id="approach" className="thesis dark"><div className="shell thesis-grid"><p className="eyebrow">OUR POINT OF VIEW</p><div><h2>Delegating to AI<br/><em>is delegating access.</em></h2><p>Each assistant you connect can use some of what you can: files, keys, accounts. Security for the AI layer starts by showing that access plainly, on the machine where it lives.</p></div></div></section>

      <section id="method" className="method section paper"><div className="shell"><Label n="03">WHY NETHERGUARD IS DIFFERENT</Label><div className="section-heading"><h2>Built for the person<br/><em>at the keyboard.</em></h2><p>Large security platforms now inventory AI agents across company fleets for IT teams. NetherGuard answers the same question for you, on your own computer.</p></div><div className="method-grid">
        <article><div className="method-top"><span>01</span><span>LOCAL</span></div><h3>Stays on<br/>your machine.</h3><p>The scan runs on your computer and the report is saved there. NetherGuard sends nothing anywhere and needs no account or admin console.</p><span className="method-foot">Nothing uploaded</span></article>
        <article><div className="method-top"><span>02</span><span>PLAIN LANGUAGE</span></div><h3>Written for people,<br/>not dashboards.</h3><p>Each finding says what it is, why it matters and how to fix it, in order of what to do first. Technical detail is there when you want it.</p><span className="method-foot">One page, ranked</span></article>
        <article><div className="method-top"><span>03</span><span>CONNECTED</span></div><h3>Shows how risks<br/>combine.</h3><p>NetherGuard links separate findings into the paths an attacker could use, so you can break the most dangerous chain with one fix.</p><span className="method-foot">Attack paths, not just a list</span></article>
      </div><div className="principles"><span>Read-only today</span><span>Secrets by name only</span><span>Mac and Windows</span><span>Works alongside your antivirus</span></div></div></section>

      <section id="command" className="steward section dark"><div className="shell"><Label n="04">OVERSIGHT FOR AGENT WORK</Label><div className="steward-heading"><div><span className="development-label">IN DEVELOPMENT</span><h2>Meet <em>NetherCommand.</em></h2></div><p>NetherGuard shows what your AI can reach. NetherCommand shows what your agents are doing: the work in progress, what is blocked and the decisions that need a person.</p></div>
        <Tabs name="command" labels={commandFeatures.map(c => c.title)} className="steward-tabs">
          {commandFeatures.map((feature,index) => <article className="steward-panel" key={feature.title}><div className="steward-concept"><span className="eyebrow">NETHERCOMMAND / 0{index + 1}</span><h3>{feature.title}</h3><p>{feature.condition}</p><span className="signal-line">{feature.signal}</span></div><div className="steward-intent"><div><span>WHAT IT DOES</span><p>{feature.build}</p></div><div><span>THE RESULT</span><p>{feature.outcome}</p></div></div></article>)}
        </Tabs>
        <p className="steward-status">NetherCommand runs inside Nether Labs every day. It is not yet available outside Nether Labs. <a className="text-link" href="/nethercommand/">About NetherCommand <Arrow /></a></p>
      </div></section>

      <section className="home-products section dark" id="products" aria-labelledby="home-products-title"><div className="shell"><Label n="05">THE PRODUCTS</Label><div className="section-heading"><h2 id="home-products-title">See what AI can reach.<br/><em>Oversee what it does.</em></h2><p>NetherGuard is in early access. NetherCommand is in development. Each product page says what works today and what does not yet.</p></div>
        <ul className="home-product-list">{featured.map((product) => <li key={product.slug} style={{ "--accent": product.accent } as React.CSSProperties}><a href={product.path}><span className="home-product-name"><i aria-hidden="true" />{product.name}</span><span className="home-product-summary">{product.summary}</span><span className="home-product-status">{product.status.toUpperCase()}</span><Arrow /></a></li>)}</ul>
        <a className="text-link home-products-all" href="/products/">See all products <Arrow /></a>
      </div></section>

      <section className="about section paper" id="about"><div className="shell about-grid"><div><Label n="06">BEHIND NETHER LABS</Label><h2>We run the agents.<br/><em>So we built the guard.</em></h2></div><div className="about-copy"><p>Nether Labs runs AI agents across its own operations every day, on Macs, Windows PCs and AI servers. We built NetherGuard to see what those agents could reach, and its first reports on our own machines found real issues.</p><p>NetherGuard v0.2 was tested on our own Mac and Windows machines. We publish what works today and what does not yet.</p><div className="founder"><span className="founder-monogram" aria-hidden="true">YL</span><div><strong>Yves La Rose</strong><span>Founder, Nether Labs · Ottawa, Canada</span></div></div></div></div></section>

      <section className="faq section paper" id="questions"><div className="shell faq-grid"><div><Label n="07">A FEW GOOD QUESTIONS</Label><h2>Before<br/><em>you install.</em></h2></div><div className="faq-list">{faqs.map((faq,i) => <details name="questions" key={faq.q}><summary><span className="faq-number">0{i + 1}</span><span>{faq.q}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></div></section>

      <section className="closing dark" id="contact"><div className="shell"><p className="eyebrow">SECURITY FOR THE AI LAYER</p><div className="closing-grid"><h2>What can your AI<br/><em>reach tonight?</em></h2><div><p>One app. One page.<br/>A clear list of what to fix first.</p><button className="button primary" aria-haspopup="dialog" aria-controls="early-access" aria-expanded={contactOpen} onClick={() => openBrief()}>Request early access <Arrow /></button><a className="contact-email" href="mailto:hello@netherlabs.ai">hello@netherlabs.ai</a><small className="mailbox-disclosure">This link opens your email application. You can also use the early-access form.</small></div></div></div></section>
    </main>
    <footer className="dark"><div className="shell footer-main"><div><a href="#top" className="brand" aria-label="Nether Labs home"><Brand /></a><p>Security for the AI layer.</p></div><nav aria-label="Footer navigation"><a href="/netherguard/">NetherGuard</a><a href="/nethercommand/">NetherCommand</a><a href="/products/">Products</a><a href="#ai-layer">The AI layer</a><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/netherenvoy/">NetherEnvoy</a><a href="/netherfuse/">NetherFuse</a><a href="/privacy/">Privacy</a></nav></div><InceptionMember variant="footer" /><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Nether Labs</span><span>Ottawa, Canada</span><a href="#top">Back to top ↑</a></div></footer>

    <dialog id="mobile-navigation" onClose={() => setMenuOpen(false)} ref={menuDialog} className="menu-dialog" aria-labelledby="menu-title" onClick={e => { if (e.target === e.currentTarget) menuDialog.current?.close(); }}><div className="dialog-top"><span id="menu-title" className="brand"><Brand /></span><button className="close-button" onClick={() => menuDialog.current?.close()} aria-label="Close navigation">×</button></div><nav aria-label="Mobile navigation">{[["NetherGuard","#guard"],["The AI layer","#ai-layer"],["NetherCommand","#command"],["Products","/products/"],["About","#about"],["Questions","#questions"]].map(([label,href]) => <a href={href} key={href} onClick={() => menuDialog.current?.close()}>{label}<Arrow /></a>)}</nav><button className="button primary" aria-haspopup="dialog" aria-controls="early-access" aria-expanded={contactOpen} onClick={() => openBrief()}>Request early access <Arrow /></button></dialog>
    <dialog id="early-access" onClose={() => setContactOpen(false)} ref={briefDialog} className="brief-dialog" aria-labelledby="brief-title" onClick={e => { if (e.target === e.currentTarget) briefDialog.current?.close(); }}><div className="dialog-top"><span className="eyebrow">NETHERGUARD EARLY ACCESS</span><button className="close-button" onClick={() => briefDialog.current?.close()} aria-label="Close early-access panel">×</button></div><h2 id="brief-title">What can your AI<br/><em>reach tonight?</em></h2><p className="brief-intro">Tell us which AI tools you use and whether you are on Mac or Windows. We will reach out as early-access places open.</p>
      <DiagnosticForm source="homepage-drawer" className="diagnostic-form" />
      <p className="mailbox-guidance">Please do not include passwords, API keys or other secrets. <a className="text-link" href="/privacy/">Privacy</a></p>
    </dialog>
  </>;
}
