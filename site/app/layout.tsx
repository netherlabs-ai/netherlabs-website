import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";
import "./night-tokens.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://netherlabs.ai"),
  title: {
    default: "Nether Labs",
    template: "%s | Nether Labs",
  },
  applicationName: "Nether Labs",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#061314",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Self-hosted fonts are preloaded so text paints in its final face (no swap shift).
  preload("/fonts/geist-sans.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/geist-mono.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
