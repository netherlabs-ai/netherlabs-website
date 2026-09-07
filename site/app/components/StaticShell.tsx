"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contactEmail, navigation } from "../lib/site";
import "./interior.css";

function Brand() {
  return <><span className="brand-mark" aria-hidden="true">N</span><span>NETHER LABS</span></>;
}

export default function StaticShell({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const homeLink = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches && menu.current?.open) menu.current.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const openMenu = () => {
    menu.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => menu.current?.close();
  const handleClose = () => {
    setMenuOpen(false);
    if (matchMedia("(max-width: 1000px)").matches) opener.current?.focus();
    else homeLink.current?.focus();
  };

  return (
    <div className="interior-site">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <Link className="brand" href="/" prefetch={false} aria-label="Nether Labs home" ref={homeLink}><Brand /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false}>{item.label}</Link>)}
        </nav>
        <Link className="header-cta" href="/contact/" prefetch={false}>Discuss a workflow <span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" type="button" ref={opener} aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="interior-navigation" onClick={openMenu}>Menu <span aria-hidden="true">☰</span></button>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="dark">
        <div className="shell footer-main">
          <div>
            <Link className="brand" href="/" prefetch={false} aria-label="Nether Labs home"><Brand /></Link>
            <p>Better workflows. Stronger businesses.</p>
            <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false}>{item.label}</Link>)}
            <Link href="/privacy/" prefetch={false}>Privacy</Link>
            <Link href="/" prefetch={false}>Home</Link>
          </nav>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Nether Labs</span>
          <span>Strategy / Systems / Operations</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </footer>
      <dialog id="interior-navigation" ref={menu} className="menu-dialog" aria-labelledby="interior-navigation-title" onClose={handleClose} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="dialog-top">
          <span id="interior-navigation-title" className="brand"><Brand /></span>
          <button type="button" className="close-button" onClick={closeMenu} aria-label="Close navigation">×</button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false} onClick={closeMenu}>{item.label}<span aria-hidden="true">↗</span></Link>)}
          <Link href="/privacy/" prefetch={false} onClick={closeMenu}>Privacy<span aria-hidden="true">↗</span></Link>
          <Link href="/" prefetch={false} onClick={closeMenu}>Home<span aria-hidden="true">↗</span></Link>
        </nav>
      </dialog>
    </div>
  );
}
