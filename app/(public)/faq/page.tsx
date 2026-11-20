import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FaqList } from "@/components/public/FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about ${siteConfig.shortName}.`,
};

// The questions and answers are edited in the "FAQ" tab of the Google Sheet.
export default function FaqPage() {
  return <FaqList />;
}
