import type { Metadata } from "next";
import HomeExperience from "./components/HomeExperience";
import JsonLd from "./components/JsonLd";
import { faqs } from "./content";
import { buildMetadata } from "./lib/site";
import { faqPage, graph, organization, website } from "./lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Security for the AI Layer",
  description: "Nether Labs builds security for the AI layer. NetherShield Guard shows what the AI tools and agents on your Mac or Windows PC can reach and do, on one page.",
  path: "/",
});

export default function HomePage() {
  return <>
    <JsonLd data={graph(organization(), website(), faqPage("/", faqs))} />
    <HomeExperience />
  </>;
}
