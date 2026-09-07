import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { buildMetadata } from "../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How Nether Labs handles public website request data and workflow diagnostic submissions.",
  path: "/privacy/",
});

const sections = [
  {
    title: "Overview",
    copy: "Nether Labs Inc. (\"Nether Labs\", \"we\", \"us\", or \"our\") respects your privacy. This policy describes what information may be processed when you visit netherlabs.ai or submit a workflow diagnostic request, how it is used, and how to make a privacy request or complaint. We collect minimal data, do not sell it, and do not share it with third parties for advertising purposes.",
  },
  {
    title: "Information processed",
    copy: "The workflow diagnostic forms collect the name, work email, company, timing, workflow and challenge information you choose to provide. Required fields are identified in the form. Our website form processor and the Nether Labs organizational mailbox process the submission so we can review and respond. Our hosting provider may also process standard request information, such as an IP address, browser type and request timestamp, for security and operational purposes. We do not use cookies for advertising or tracking.",
  },
  {
    title: "How we use information",
    copy: "Diagnostic submission information is used to review and respond to inquiries, determine whether a workflow diagnostic is warranted, maintain appropriate correspondence records, protect our systems, and comply with applicable legal obligations. Standard website request information may be used to deliver, operate, secure and troubleshoot the public website.",
  },
  {
    title: "No sale or advertising use",
    copy: "We do not sell, rent or trade personal information. We do not share personal information with third parties for advertising purposes.",
  },
  {
    title: "Service providers",
    copy: "Netlify hosts the website, processes workflow diagnostic submissions through Netlify Forms and the associated serverless intake function, and may process limited request information needed to deliver and protect the service. Our organizational email provider may process a submission when it is routed for review. These providers process information under their respective terms and privacy practices.",
  },
  {
    title: "Data retention",
    copy: "Workflow diagnostic submissions and related correspondence may be retained in our contact intake systems and organizational mailbox for up to 24 months after the last interaction so we can respond and maintain appropriate records. We may retain information longer only where required by law or covered by a documented legal hold, active legal claim, regulatory matter or security investigation. We may retain de-identified operational records after that period where they no longer identify an individual.",
  },
  {
    title: "Your rights and complaints",
    copy: "Depending on your jurisdiction, you may have rights to access, correct or request deletion of personal information we hold about you. To make a privacy request or raise a complaint, email the Nether Labs privacy lead at hello@netherlabs.ai with the subject Privacy Request. We may need to verify your identity before acting on a request and may retain information where a documented legal obligation or hold applies.",
  },
  {
    title: "Website-side data boundary",
    copy: "This website uses one serverless intake function and one Netlify Forms sink for workflow diagnostic submissions. It does not use analytics, a chat widget, a customer relationship management system, advertising trackers, browser storage for contact content or a separate website-side contact database. This statement does not exclude the hosting, form processing and mailbox processing described above.",
  },
  {
    title: "Changes to this policy",
    copy: "We may update this policy when our website or information practices change. The effective date below identifies the version currently published.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <InteriorPage
      eyebrow="PRIVACY"
      title="Privacy policy for the Nether Labs public website."
      introduction="Effective date: July 17, 2026. Nether Labs Inc., Ontario, Canada."
    >
      <div className="privacy-copy">
        {sections.map((section) => (
          <section key={section.title} aria-labelledby={`privacy-${section.title.toLowerCase().replaceAll(" ", "-")}`}>
            <h2 id={`privacy-${section.title.toLowerCase().replaceAll(" ", "-")}`}>{section.title}</h2>
            <p>{section.copy}</p>
          </section>
        ))}
        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            Privacy requests and privacy complaints can be sent to <a href="mailto:hello@netherlabs.ai">hello@netherlabs.ai</a>.
          </p>
        </section>
      </div>
    </InteriorPage>
  );
}
