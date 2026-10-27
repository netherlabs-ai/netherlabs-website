import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { buildMetadata } from "../lib/site";

const principles = [
  {
    number: "01",
    title: "Workflow before software",
    copy: "Begin with how the work actually moves, where it breaks down and what a better outcome would make possible.",
  },
  {
    number: "02",
    title: "People remain accountable",
    copy: "AI can prepare, recommend and execute within clear boundaries. People retain authority over consequential decisions.",
  },
  {
    number: "03",
    title: "Governance is architecture",
    copy: "Permissions, evidence, review, escalation and security belong in the system from the beginning.",
  },
  {
    number: "04",
    title: "Evidence earns expansion",
    copy: "Measure quality, time, cost and risk. Broaden the system only when real operating evidence supports it.",
  },
] as const;

const companyPath = [
  {
    number: "01",
    title: "Diagnose",
    copy: "Find the workflow where a governed improvement can create meaningful operating leverage now.",
  },
  {
    number: "02",
    title: "Implement",
    copy: "Turn the strongest opportunity into a controlled system that works against real examples and exceptions.",
  },
  {
    number: "03",
    title: "NetherForge",
    copy: "Use proven patterns to shape the operating environment that connects intelligence across the whole business.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "How Nether Labs helps established organizations direct AI at real operating constraints and compound governed improvements.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="ABOUT NETHER LABS"
      title="Built by an operator. For operators."
      introduction="Nether Labs is an AI systems company for established businesses. We help leaders improve real operations today while building the governed operating layer for what comes next."
    >
      <div className="interior-lead">
        <p>We believe AI is changing the economics of execution. As routine work becomes cheaper and faster, advantage shifts toward the quality of the idea, the clarity of the decision and the system that can carry both into practice.</p>
      </div>

      <section className="interior-section" aria-labelledby="about-purpose-title">
        <p className="micro-label">WHY WE EXIST</p>
        <h2 id="about-purpose-title">The business already contains the raw material.</h2>
        <p>Customers, expertise, data, workflows, systems and hard-won institutional knowledge are already in motion. What many businesses lack is a practical way to connect those assets to AI without losing control, context or accountability. Nether Labs exists to close that gap.</p>
      </section>

      <section className="interior-section" aria-labelledby="about-principles-title">
        <p className="micro-label">WHAT WE BELIEVE</p>
        <h2 id="about-principles-title">Principles before platforms.</h2>
        <p>Technology should serve the operating model, not force the business to reorganize around another tool.</p>
        <div className="interior-card-grid four-up">
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="interior-proof" aria-labelledby="operating-proof-title">
        <div>
          <h2 id="operating-proof-title">Our own work informs the approach.</h2>
          <p>We use agent-assisted workflows in our own operations, with defined roles, review and escalation. That experience informs our approach; every client workflow still needs its own evidence.</p>
        </div>
      </section>

      <section className="interior-section" aria-labelledby="about-founder-title">
        <p className="micro-label">FOUNDER</p>
        <h2 id="about-founder-title">Built by an operator, for operators.</h2>
        <p>Yves La Rose founded Nether Labs around a simple conviction: businesses should not need to rebuild themselves from scratch to benefit from AI. The company starts with the operating reality, assigns clear authority, tests against evidence and compounds only what works.</p>
      </section>

      <section className="interior-section stack-section" aria-labelledby="about-path-title">
        <p className="micro-label">FROM PRACTICE TO PRODUCT</p>
        <h2 id="about-path-title">Improve what exists. Build what comes next.</h2>
        <p>Workflow diagnostics are the front door. Controlled implementation creates evidence. Those lessons inform NetherForge, our operating environment in development. It is designed to connect intelligence, memory, governance and execution across the business. Implementation is scoped separately from the diagnostic.</p>
        <div className="stack-list">
          {companyPath.map((stage) => (
            <article key={stage.number}>
              <span>{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mailbox-panel" aria-labelledby="about-contact-title">
        <p className="micro-label">START WITH THE BUSINESS YOU HAVE</p>
        <h2 id="about-contact-title">Bring us the workflow that should work better.</h2>
        <p>We will help you understand the operating drag, the opportunity and the controls required before you commit to a larger build.</p>
        <a className="button button-light" href="/workflow-audit/">Explore the workflow diagnostic <span aria-hidden="true">↗</span></a>
      </section>
    </InteriorPage>
  );
}
