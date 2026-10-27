import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { buildMetadata, capabilities, stackLayers } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "NetherForge",
  description: "NetherForge is the Nether Labs pathway for connecting workflows, knowledge, agents, governance, metrics and human authority.",
  path: "/netherforge/",
});

export default function NetherForgePage() {
  return (
    <InteriorPage
      eyebrow="NETHERFORGE / IN DEVELOPMENT"
      title="Optimize one workflow. Then connect the whole operating stack."
      introduction="NetherForge is the product we are building for established organizations ready to move beyond isolated workflow improvements."
    >
      <div className="interior-lead">
        <p>It is designed to connect workflows, knowledge, agents, governance, metrics and human authority in one managed operating environment. NetherForge is in development. These are design intentions, not a claim that every capability is available today. A workflow diagnostic is available independently, and production implementation is scoped separately.</p>
      </div>
      <section className="interior-section" aria-labelledby="netherforge-capabilities-title">
        <p className="micro-label">DESIGN INTENTIONS</p>
        <h2 id="netherforge-capabilities-title">The principles behind coordinated work.</h2>
        <div className="interior-card-grid four-up">
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="system" className="interior-section stack-section" aria-labelledby="stack-title">
        <p className="micro-label">THE INTELLIGENCE STACK</p>
        <h2 id="stack-title">A durable AI operating model connects the stack your business already runs on.</h2>
        <div className="stack-list">
          {stackLayers.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </InteriorPage>
  );
}
