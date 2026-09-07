"use client";

import DiagnosticForm from "./DiagnosticForm";

import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { auditSteps, capabilities, layers, faqs } from "../content";
import CinematicHero from "./CinematicHero";

const workflowExamples = [
  { label: "Documents & proposals", short: "Documents", title: "Get from incoming information to a confident response.", description: "Bid packages, client requests and supporting documents arrive in different places. Your team spends its time finding, checking and assembling information before the real decision can happen.", steps: ["Receive documents", "Extract & compare", "Expert review", "Prepare response"], bottleneck: "Repeated reading. Missing context. Manual assembly.", opportunity: "Prepare the information and flag gaps, so the expert can focus on the decision.", boundary: "A qualified person checks the evidence and approves the response." },
  { label: "Handoffs & approvals", short: "Handoffs", title: "Keep good work from getting stuck between people.", description: "A request moves through email, spreadsheets and business software. Each handoff means another follow-up, another status check and another chance for context to disappear.", steps: ["Receive request", "Gather inputs", "Owner approval", "Update systems"], bottleneck: "Unclear ownership. Waiting for inputs. Duplicate entry.", opportunity: "Coordinate the next step, prepare the inputs and make exceptions visible.", boundary: "The accountable owner retains consequential approvals and escalation." },
  { label: "Knowledge & expertise", short: "Knowledge", title: "Put your business knowledge within reach.", description: "Useful answers are scattered across past projects, files and a few experienced people. The same questions keep pulling your specialists away from higher-value work.", steps: ["Ask a question", "Find sources", "Verify context", "Use the answer"], bottleneck: "Repeated questions. Scattered history. Expert dependency.", opportunity: "Retrieve relevant material with its sources and identify when the answer needs review.", boundary: "Access follows permissions. Uncertainty goes back to a person." },
  { label: "Connected operations", short: "Operations", title: "Make the improvements work together.", description: "Individual automations help, but the business still has to connect priorities, knowledge, systems and people. The next step is an operating model that can be understood and managed.", steps: ["Set priorities", "Coordinate work", "Review exceptions", "Measure outcomes"], bottleneck: "Isolated tools. Conflicting context. Invisible failure.", opportunity: "Connect proven workflows with explicit roles, shared context and visible controls.", boundary: "People set authority, own outcomes and decide what expands." },
];

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
    <div className="tab-list" role="tablist" aria-label={({idea:"Workflow examples",diagnostic:"Diagnostic stages",capability:"Steward design principles",layer:"Operating architecture"} as Record<string,string>)[name] || name}>
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
      <nav aria-label="Primary navigation" className="desktop-nav"><a href="#diagnostic">The diagnostic</a><a href="#method">Our approach</a><a href="#capabilities">Steward</a></nav>
      <button className="header-cta" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={() => openBrief()}>Discuss a workflow <Arrow /></button>
      <button className="menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => { setMenuOpen(true); menuDialog.current?.showModal(); }}>Menu <span aria-hidden="true">☰</span></button>
    </header>
    <main id="main-content" tabIndex={-1}>
      <CinematicHero contactOpen={contactOpen} onContact={() => openBrief()} />

      <section id="workflows" className="workflows section dark">
        <div className="shell">
          <Label n="01">FIND YOUR STARTING POINT</Label>
          <div className="section-heading"><h2>The opportunity is<br/><em>already in the work.</em></h2><p>Start with the recurring task that takes too long, depends on too few people or gets stuck between systems.</p></div>
          <Tabs name="idea" labels={workflowExamples.map(w => w.label)} className="workflow-tabs">
            {workflowExamples.map(example => <article className="workflow-example" key={example.label}>
              <div className="workflow-description"><span className="eyebrow">{example.label}</span><h3>{example.title}</h3><p>{example.description}</p><button className="text-link" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={() => openBrief()}>Discuss this workflow <Arrow /></button></div>
              <div className="workflow-map"><div className="map-caption"><span>ILLUSTRATIVE WORKFLOW</span><span>HUMAN REVIEW RETAINED</span></div><ol className="flow-nodes">{example.steps.map((step, i) => <li key={step} className={i === 2 ? "review-node" : ""}><span>0{i + 1}</span><strong>{step}</strong>{i === 2 && <small>Human decision</small>}</li>)}</ol><div className="map-notes"><div><span>THE FRICTION</span><p>{example.bottleneck}</p></div><div><span>THE OPPORTUNITY</span><p>{example.opportunity}</p></div></div><p className="human-boundary"><span aria-hidden="true">↳</span>{example.boundary}</p></div>
            </article>)}
          </Tabs>
        </div>
      </section>

      <section id="diagnostic" className="diagnostic section paper">
        <div className="shell">
          <Label n="02">THE WORKFLOW DIAGNOSTIC</Label>
          <div className="diagnostic-heading"><h2>A clear decision.<br/><em>Before you build.</em></h2><div><p>We examine how the work actually happens, find where time and context are lost, and define a practical first improvement.</p><p>You leave with the evidence to decide what is worth building, what needs human judgment, and what should wait.</p><span className="availability">Available now · Fixed scope agreed upfront</span></div></div>
          <Tabs name="diagnostic" labels={auditSteps.map(s => s.title)} className="diagnostic-tabs">
            {auditSteps.map((step, i) => <article className="diagnostic-sheet" key={step.number}>
              <div className="sheet-rail"><span>NETHER LABS / DIAGNOSTIC</span><span>0{i + 1} / 05</span></div>
              <div className="sheet-main"><div className="sheet-copy"><p className="eyebrow">YOUR DELIVERABLE</p><h3>{step.output}</h3><p>{step.copy}</p><div className="deliverable-outcome"><span>THE DECISION IT SUPPORTS</span><strong>{["Where is the work getting stuck?", "What does the friction actually cost?", "Which improvement is worth pursuing?", "What can the system do, and who approves?", "What should we test, and how will we judge it?"][i]}</strong></div></div>
              <div className="evidence-card"><div className="evidence-title"><span>{step.signal}</span><span aria-hidden="true">↗</span></div>{step.nodes.map((node,j) => <div className="evidence-row" key={node}><span>0{j+1}</span><strong>{node}</strong><span className="evidence-line" aria-hidden="true" /></div>)}<p>Grounded in your workflow, your examples and your constraints.</p></div></div>
            </article>)}
          </Tabs>
          <div className="diagnostic-bottom"><div><h3>Start with a conversation.</h3><p>Bring one workflow and what makes it difficult. We’ll discuss whether a paid diagnostic is a useful next step.</p></div><button className="button dark-button" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={() => openBrief()}>Discuss a workflow <Arrow /></button></div>
          <p className="scope-note">The diagnostic provides recommendations and a pilot roadmap. Production implementation is scoped separately, with no obligation to continue.</p>
        </div>
      </section>

      <section id="approach" className="thesis dark"><div className="shell thesis-grid"><p className="eyebrow">OUR POINT OF VIEW</p><div><h2>AI makes more possible.<br/><em>Judgment makes it useful.</em></h2><p>Your advantage is the knowledge, relationships and experience already inside your business. The technology should give those strengths more room to work.</p></div></div></section>

      <section id="method" className="method section paper"><div className="shell"><Label n="03">HOW WE WORK</Label><div className="section-heading"><h2>One workflow first.<br/><em>Build on what works.</em></h2><p>A practical path from a real operating problem to an improvement your team can trust.</p></div><div className="method-grid">
        <article><div className="method-top"><span>01</span><span>DIAGNOSTIC</span></div><h3>Understand<br/>the work.</h3><p>Map the process with the people doing it. Establish the friction, evaluate opportunities and agree what a successful pilot would prove.</p><span className="method-foot">A decision and a roadmap</span></article>
        <article><div className="method-top"><span>02</span><span>IMPLEMENTATION</span></div><h3>Build a<br/>controlled pilot.</h3><p>Scope one improvement. Connect the required systems, set review gates and test against real examples before expanding its use.</p><span className="method-foot">Separately scoped engagement</span></article>
        <article><div className="method-top"><span>03</span><span>OPERATION & IMPROVEMENT</span></div><h3>Prove it.<br/>Then expand.</h3><p>Measure quality, cost and adoption. Make exceptions visible, strengthen what works and carry that learning into the next workflow.</p><span className="method-foot">Expansion follows evidence</span></article>
      </div><div className="principles"><span>Human authority</span><span>Explicit data boundaries</span><span>Tools chosen for the work</span><span>Measurable outcomes</span></div></div></section>

      <section id="capabilities" className="steward section dark"><div className="shell"><Label n="04">THE LONGER VIEW</Label><div className="steward-heading"><div><span className="development-label">IN DEVELOPMENT</span><h2>Meet <em>Steward.</em></h2></div><p>We’re building toward a connected operating environment for workflows, knowledge and agents. Human direction and accountability belong at its core.</p></div>
        <Tabs name="capability" labels={capabilities.map(c => c.title)} className="steward-tabs">
          {capabilities.map((capability,index) => <article className="steward-panel" key={capability.id}><div className="steward-concept"><span className="eyebrow">DESIGN PRINCIPLE / 0{index + 1}</span><h3>{capability.title}</h3><p>{capability.condition}</p><span className="signal-line">{capability.signal}</span></div><div className="steward-intent"><div><span>WHAT WE ARE DESIGNING</span><p>{capability.build}</p></div><div><span>THE INTENDED RESULT</span><p>{capability.outcome}</p></div></div></article>)}
        </Tabs>
        <p className="steward-status">Steward is in development. The diagnostic is available independently; implementation is scoped separately.</p>
        <div id="system" className="system"><div className="system-intro"><p className="eyebrow">THE OPERATING ARCHITECTURE</p><h3>Designed around<br/>the whole business.</h3><p>The layers that need to work together as individual improvements become a connected system.</p></div><Tabs name="layer" labels={layers.map(l => l.title)} className="system-tabs">{layers.map(layer => <article className="layer-detail" key={layer.id}><span className="layer-number">{layer.number}</span><h4>{layer.title}</h4><p>{layer.detail}</p><div className="tag-row">{layer.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</Tabs></div>
      </div></section>

      <section className="about section paper" id="about"><div className="shell about-grid"><div><Label n="05">BEHIND NETHER LABS</Label><h2>Built by an operator.<br/><em>For operators.</em></h2></div><div className="about-copy"><p>Nether Labs is led by Yves La Rose. Our work starts with how a business actually operates: its customers, responsibilities, constraints and the people who make it run.</p><p>We use agent-assisted workflows in our own operations, with defined roles, review and escalation. That experience informs our approach; every client workflow still needs its own evidence.</p><div className="founder"><span className="founder-monogram" aria-hidden="true">YL</span><div><strong>Yves La Rose</strong><span>Founder, Nether Labs · Ottawa, Canada</span></div></div></div></div></section>

      <section className="faq section paper" id="questions"><div className="shell faq-grid"><div><Label n="06">A FEW GOOD QUESTIONS</Label><h2>Before<br/><em>we begin.</em></h2></div><div className="faq-list">{faqs.map((faq,i) => <details name="questions" key={faq.q}><summary><span className="faq-number">0{i + 1}</span><span>{faq.q}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></div></section>

      <section className="closing dark" id="contact"><div className="shell"><p className="eyebrow">LET’S FIND YOUR STARTING POINT</p><div className="closing-grid"><h2>What should<br/><em>work better?</em></h2><div><p>One workflow. One honest conversation.<br/>A clearer idea of what is possible.</p><button className="button primary" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={() => openBrief()}>Discuss a workflow <Arrow /></button><a className="contact-email" href="mailto:hello@netherlabs.ai">hello@netherlabs.ai</a><small className="mailbox-disclosure">This link opens your email application. You can also use the form above.</small></div></div></div></section>
    </main>
    <footer className="dark"><div className="shell footer-main"><div><a href="#top" className="brand" aria-label="Nether Labs home"><Brand /></a><p>Better workflows. Stronger businesses.</p></div><nav aria-label="Footer navigation"><a href="#diagnostic">The diagnostic</a><a href="#method">Our approach</a><a href="#capabilities">Steward</a><a href="/about/">About</a><a href="/workflow-audit/">Diagnostic details</a><a href="/steward/">About Steward</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a></nav></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Nether Labs</span><span>Strategy / Systems / Operations</span><a href="#top">Back to top ↑</a></div></footer>

    <dialog id="mobile-navigation" onClose={() => setMenuOpen(false)} ref={menuDialog} className="menu-dialog" aria-labelledby="menu-title" onClick={e => { if (e.target === e.currentTarget) menuDialog.current?.close(); }}><div className="dialog-top"><span id="menu-title" className="brand"><Brand /></span><button className="close-button" onClick={() => menuDialog.current?.close()} aria-label="Close navigation">×</button></div><nav aria-label="Mobile navigation">{[["The diagnostic","#diagnostic"],["Our approach","#method"],["Steward","#capabilities"],["About","#about"],["Questions","#questions"]].map(([label,href]) => <a href={href} key={href} onClick={() => menuDialog.current?.close()}>{label}<Arrow /></a>)}</nav><button className="button primary" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={() => openBrief()}>Discuss a workflow <Arrow /></button></dialog>
    <dialog id="workflow-contact" onClose={() => setContactOpen(false)} ref={briefDialog} className="brief-dialog" aria-labelledby="brief-title" onClick={e => { if (e.target === e.currentTarget) briefDialog.current?.close(); }}><div className="dialog-top"><span className="eyebrow">LET’S TALK ABOUT THE WORK</span><button className="close-button" onClick={() => briefDialog.current?.close()} aria-label="Close contact panel">×</button></div><h2 id="brief-title">What should<br/><em>work better?</em></h2><p className="brief-intro">Tell us where things get difficult. We’ll discuss whether a paid diagnostic is a useful next step.</p>
      <DiagnosticForm source="homepage-drawer" className="diagnostic-form" />
      <p className="mailbox-guidance">Please leave out confidential documents and personal client information. <a className="text-link" href="/privacy/">Privacy</a></p>
    </dialog>
  </>;
}
