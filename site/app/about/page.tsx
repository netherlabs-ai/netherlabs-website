import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import InceptionMember from "../components/InceptionMember";
import { buildMetadata } from "../lib/site";

const principles = [
  {
    number: "01",
    title: "See it before you trust it",
    copy: "Every AI tool you connect works with some of your access. The first job of security for the AI layer is to show that access plainly.",
  },
  {
    number: "02",
    title: "Your data stays yours",
    copy: "Guard runs on your computer and sends nothing anywhere. Secrets are reported by name and location, never by value.",
  },
  {
    number: "03",
    title: "Plain language, ranked",
    copy: "A finding is only useful if you can act on it. Say what it is, why it matters and what to fix first.",
  },
  {
    number: "04",
    title: "Claim only what is proven",
    copy: "Each product page says what works today and what does not yet. We update it when something ships, not before.",
  },
] as const;

const companyPath = [
  {
    number: "01",
    title: "NetherShield Guard",
    copy: "See what the AI on your Mac or PC can reach and do, on one page. v0.2 release candidate; early access by request.",
  },
  {
    number: "02",
    title: "Guard, always on",
    copy: "Next: a monitor in the menu bar or tray that notices new connectors, keys and risky settings, with reversible fixes. In development.",
  },
  {
    number: "03",
    title: "NetherCommand",
    copy: "Oversight of what your agents are doing and the decisions that need a person. Runs inside Nether Labs; in development.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Nether Labs is an AI security company. We build security for the AI layer, starting with NetherShield Guard for Mac and Windows.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="ABOUT NETHER LABS"
      title="We run the agents. So we built the guard."
      introduction="Nether Labs is an AI security company in Ottawa, Canada. We build security for the AI layer: the AI tools and agents on your computer, the connectors they use, the keys they can read and the settings around them."
    >
      <div className="interior-lead">
        <p>AI assistants now read files, hold keys and run commands with the same access as the person using them. That makes them useful. It also makes them the newest way into a computer, and most people cannot see what their AI can reach.</p>
      </div>

      <section className="interior-section" aria-labelledby="about-purpose-title">
        <p className="micro-label">WHY WE EXIST</p>
        <h2 id="about-purpose-title">The AI layer needs its own security.</h2>
        <p>Antivirus watches for malware. Large security platforms now inventory AI agents for IT teams across company fleets. The person at the keyboard, running Claude, ChatGPT, Cursor and a handful of connectors on their own machine, still has no plain answer to a simple question: what can my AI reach? Nether Labs exists to answer it.</p>
      </section>

      <section className="interior-section" aria-labelledby="about-principles-title">
        <p className="micro-label">WHAT WE BELIEVE</p>
        <h2 id="about-principles-title">Principles before features.</h2>
        <p>Security software asks for trust. These are the rules we hold ourselves to in return.</p>
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
          <h2 id="operating-proof-title">We are our own first test.</h2>
          <p>Nether Labs runs AI agents across its own operations every day, on Macs, Windows PCs and AI servers. Guard v0.2 was proven on our own Mac and Windows machines first, and its first reports found things we had to fix.</p>
        </div>
      </section>

      <section className="interior-section" aria-labelledby="about-founder-title">
        <p className="micro-label">FOUNDER</p>
        <h2 id="about-founder-title">Built by an operator, for operators.</h2>
        <p>Yves La Rose founded Nether Labs and runs it with a large team of AI agents. Guard started as the tool we needed to see, in plain language, what those agents could reach on our own machines.</p>
        <InceptionMember variant="about" />
      </section>

      <section className="interior-section stack-section" aria-labelledby="about-path-title">
        <p className="micro-label">WHAT WE ARE BUILDING</p>
        <h2 id="about-path-title">See what AI can reach. Oversee what it does.</h2>
        <p>Guard comes first. NetherCommand follows, for owners who need oversight of the work their agents do.</p>
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
        <p className="micro-label">EARLY ACCESS</p>
        <h2 id="about-contact-title">See what the AI on your computer can reach.</h2>
        <p>NetherShield Guard early access is open by request for Mac and Windows.</p>
        <a className="button button-light" href="/contact/?product=nethershield-guard">Request early access <span aria-hidden="true">↗</span></a>
      </section>
    </InteriorPage>
  );
}
