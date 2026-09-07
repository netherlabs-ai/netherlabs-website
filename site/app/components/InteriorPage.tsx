import type { ReactNode } from "react";
import StaticShell from "./StaticShell";

type InteriorPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
};

export default function InteriorPage({ eyebrow, title, introduction, children }: InteriorPageProps) {
  return (
    <StaticShell>
      <section className="interior-hero dark-section">
        <picture>
          <source media="(max-width: 760px)" srcSet="/hero-factory-enhanced-mobile.webp" />
          <img
            src="/hero-factory-enhanced-1920.webp"
            srcSet="/hero-factory-enhanced-1920.webp 1920w, /hero-factory-enhanced-3840.webp 3840w"
            sizes="100vw"
            width="1920"
            height="1080"
            alt=""
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="interior-hero-shade" aria-hidden="true" />
        <div className="page-shell interior-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </div>
      </section>
      <section className="interior-content light-section">
        <div className="page-shell">{children}</div>
      </section>
    </StaticShell>
  );
}
