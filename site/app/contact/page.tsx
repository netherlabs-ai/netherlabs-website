import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import DiagnosticForm from "../components/DiagnosticForm";
import { buildMetadata } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Request early access to NetherShield Guard for Mac or Windows, or contact Nether Labs about AI-layer security.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <InteriorPage
      eyebrow="EARLY ACCESS AND CONTACT"
      title="See what the AI on your computer can reach."
      introduction="NetherShield Guard early access is open by request for Macs with Apple silicon and Windows PCs. Tell us which AI tools and agents you use, and we will reach out as places open."
    >
      <section className="contact-form-panel" aria-labelledby="contact-form-title">
        <p className="micro-label">NETHERSHIELD GUARD EARLY ACCESS</p>
        <h2 id="contact-form-title">Request early access.</h2>
        <p>Tell us which AI assistants, coding agents and connectors you use, whether you are on Mac or Windows, and whether it is just you or a team. Please do not include passwords, API keys or other secrets.</p>
        <p>Interested in <a className="inline-link" href="/nethercommand/">NetherCommand</a> or another <a className="inline-link" href="/products/">Nether Labs product</a>? Use the same form and name the product in the “Interested in” field.</p>
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
