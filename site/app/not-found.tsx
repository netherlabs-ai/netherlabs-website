import type { Metadata } from "next";
import Link from "next/link";
import StaticShell from "./components/StaticShell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Nether Labs page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <StaticShell>
      <section className="not-found dark-section">
        <div className="page-shell">
          <p className="micro-label">404 / PAGE NOT FOUND</p>
          <h1>This page is outside the operating map.</h1>
          <p>Return to the Nether Labs home page or contact us about the workflow that should work better next.</p>
          <div>
            <Link className="button button-light" href="/">Return home</Link>
            <a className="text-link" href="/contact/">Contact Nether Labs</a>
          </div>
        </div>
      </section>
    </StaticShell>
  );
}
