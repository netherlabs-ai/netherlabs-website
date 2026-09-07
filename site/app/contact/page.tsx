import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import DiagnosticForm from "../components/DiagnosticForm";
import { buildMetadata } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact Nether Labs about a workflow diagnostic for an established business.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <InteriorPage
      eyebrow="CONTACT NETHER LABS"
      title="Bring us the work that should not still be this hard."
      introduction="The strongest starting points are repeated, measurable, owned and grounded in real examples."
    >
      <section className="contact-form-panel" aria-labelledby="contact-form-title">
        <p className="micro-label">BEGIN WITH ONE WORKFLOW</p>
        <h2 id="contact-form-title">Request a workflow diagnostic.</h2>
        <p>Tell us which repeated workflow is creating drag, where it breaks down, and what a better result would make possible.</p>
        <DiagnosticForm source="contact-page" className="route-form" />
        <form name="workflow-diagnostic" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="workflow-diagnostic" />
          <input name="bot-field" /><input name="name" /><input name="email" /><input name="company" />
          <input name="timing" /><input name="workflow" /><textarea name="challenge" /><input name="source" />
          <input name="recipient" /><input name="flagged_for_review" /><input name="flagged_patterns" /><textarea name="brief" />
        </form>
      </section>
    </InteriorPage>
  );
}
