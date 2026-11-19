import type { Metadata } from "next";
import { ModulePage } from "@/components/public/ModulePage";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied research tracks, experimental frameworks and technical publications.",
};


export default function Page() {
  return (
    <ModulePage
      title="Research"
      description="Applied research tracks, experimental frameworks, and technical publications."
      moduleKey="research"
    />
  );
}
