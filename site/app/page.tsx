import type { Metadata } from "next";
import HomeExperience from "./components/HomeExperience";
import { buildMetadata } from "./lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI Workflow Strategy and Implementation",
  description: "Nether Labs helps established businesses find where AI can improve real workflows. Start with a focused diagnostic, clear human review and a practical implementation path.",
  path: "/",
});

export default function HomePage() {
  return <HomeExperience />;
}
