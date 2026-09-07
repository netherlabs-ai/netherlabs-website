import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { auditSteps, buildMetadata } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI Workflow Diagnostic",
  description: "Map one real workflow, expose operating drag, define controls and create a governed path to a first pilot.",
  path: "/workflow-audit/",
});

export default function WorkflowAuditPage() {
  return (
    <InteriorPage
      eyebrow="AI WORKFLOW DIAGNOSTIC"
      title="Find the workflows worth fixing first."
      introduction="Start with one repeated workflow. Map how it actually moves, expose the operating drag and define the first governed improvement worth implementing."
    >
      <section className="interior-section" aria-labelledby="audit-stages-title">
        <p className="micro-label">THE FRONT DOOR</p>
        <h2 id="audit-stages-title">Decision-quality evidence before implementation.</h2>
        <div className="interior-card-grid audit-grid">
          {auditSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number} / {step.title}</span>
              <h3>{step.output}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mailbox-panel" aria-labelledby="audit-contact-title">
        <p className="micro-label">BEGIN WITH ONE WORKFLOW</p>
        <h2 id="audit-contact-title">What work should not still be this hard?</h2>
        <p>Start with a conversation about one workflow. We will discuss whether a paid, fixed-scope diagnostic is useful. The diagnostic provides recommendations and a pilot roadmap; production implementation is scoped separately, with no obligation to continue.</p>
        <a className="button button-light" href="mailto:hello@netherlabs.ai">hello@netherlabs.ai <span aria-hidden="true">↗</span></a>
        <small>This link opens your email application. The website does not collect or submit your message.</small>
      </section>
    </InteriorPage>
  );
}
