"use client";

import { useEffect, useRef } from "react";
import "./cinematic-hero.css";

export default function CinematicHero({ onContact, contactOpen }: { onContact: () => void; contactOpen: boolean }) {
  const scene = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 1001px) and (min-height: 700px)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let headerHeight = 88;
    let travel = 1;
    let origin = 0;
    let scrollMode = false;
    let pointerX = 0;
    let pointerY = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const render = () => {
      frame = 0;
      const p = scrollMode ? clamp((scrollY - origin) / travel) : 0;
      const nearby = scrollY < origin + root.offsetHeight + innerHeight;
      const cameraProgress = scrollMode ? p : clamp((scrollY - origin) / Math.max(1, root.offsetHeight)) * .2;
      // The image, shading and progress all follow the same document position.
      // No trailing scroll animation or competing position calculation.
      root.style.setProperty("--camera-scale", reduced.matches ? "1" : String(1.035 + cameraProgress * .295));
      root.style.setProperty("--camera-x", `${nearby && !reduced.matches ? pointerX - cameraProgress * 28 : 0}px`);
      root.style.setProperty("--camera-y", `${nearby && !reduced.matches ? pointerY - cameraProgress * 20 : 0}px`);
      root.style.setProperty("--scene-fade", String(clamp((p - .72) / .28) * .75));
      root.style.setProperty("--scene-progress", String(p));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const measure = () => {
      headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 88;
      root.style.setProperty("--scene-header", `${headerHeight}px`);
      // Enlarged text and short windows use natural page flow, keeping every
      // headline and action reachable without trapping content in a viewport.
      scrollMode = desktop.matches && !reduced.matches && (copy.current?.scrollHeight ?? 0) + 112 < innerHeight - headerHeight;
      root.dataset.motion = scrollMode ? "scroll" : "natural";
      origin = root.getBoundingClientRect().top + scrollY - headerHeight;
      const stage = root.querySelector<HTMLElement>(".cinema-stage");
      travel = Math.max(1, root.offsetHeight - (stage?.offsetHeight ?? innerHeight));
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches || event.pointerType === "touch") return;
      pointerX = (event.clientX / innerWidth - .5) * -14;
      pointerY = (event.clientY / innerHeight - .5) * -10;
      schedule();
    };
    const leave = () => { pointerX = 0; pointerY = 0; schedule(); };
    const observer = new ResizeObserver(measure);
    if (copy.current) observer.observe(copy.current);
    const header = document.querySelector(".site-header");
    if (header) observer.observe(header);
    addEventListener("resize", measure, { passive: true });
    addEventListener("scroll", schedule, { passive: true });
    reduced.addEventListener("change", measure);
    desktop.addEventListener("change", measure);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    measure();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      removeEventListener("resize", measure); removeEventListener("scroll", schedule);
      reduced.removeEventListener("change", measure); desktop.removeEventListener("change", measure);
      root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <section className="cinema" id="top" ref={scene} aria-label="Nether Labs introduction">
    <div className="cinema-stage">
      <div className="cinema-camera" aria-hidden="true">
        <picture>
          <source media="(max-width: 600px)" srcSet="/hero-factory-enhanced-mobile.webp" />
          <img src="/hero-factory-enhanced-1920.webp" srcSet="/hero-factory-enhanced-1920.webp 1920w, /hero-factory-enhanced-3840.webp 3840w" sizes="100vw" width="1920" height="1080" alt="" fetchPriority="high" />
        </picture>
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="cinema-exit" aria-hidden="true" />
      <div className="cinema-content shell">
        <div ref={copy} className="cinema-copy">
          <p className="eyebrow"><span className="short-rule" /> AI STRATEGY. BUILT AROUND YOUR BUSINESS.</p>
          <h1>Less friction.<br /><em>More possibility.</em></h1>
          <p className="cinema-description">Your best people have better things to do. We help you find where AI can take work off their hands, then build the right workflow around them.</p>
          <div className="cinema-actions">
            <button className="button primary" aria-haspopup="dialog" aria-controls="workflow-contact" aria-expanded={contactOpen} onClick={onContact}>Discuss a workflow <span aria-hidden="true">↗︎</span></button>
            <a className="text-link" href="#diagnostic">Explore the diagnostic <span aria-hidden="true">↓</span></a>
          </div>
          <p className="cinema-note">For established businesses. Start with one real workflow.</p>
        </div>
      </div>
      <div className="cinema-footer shell">
        <a className="cinema-scroll" href="#workflows"><span className="cinema-scroll-label">SCROLL INTO THE POSSIBILITIES</span><span className="cinema-static-label">EXPLORE THE POSSIBILITIES</span><span aria-hidden="true">↓</span><i aria-hidden="true"><b /></i></a>
        <p className="cinema-caption"><span>THE NETHER LABS OPERATING VISION</span>Human direction. Coordinated execution.</p>
      </div>
    </div>
  </section>;
}
