import type { Metadata } from "next";
import HomeExperience from "./components/HomeExperience";
import JsonLd from "./components/JsonLd";
import { faqs } from "./content";
import { buildMetadata } from "./lib/site";
import { faqPage, graph, organization, website } from "./lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "AI Workflow Strategy and Implementation",
  description: "Nether Labs helps established businesses find where AI can improve real workflows: a focused diagnostic, clear human review and a practical implementation path.",
  path: "/",
});

export default function HomePage() {
  return <>
    <JsonLd data={graph(organization(), website(), faqPage("/", faqs))} />
    <HomeExperience />
  </>;
}
