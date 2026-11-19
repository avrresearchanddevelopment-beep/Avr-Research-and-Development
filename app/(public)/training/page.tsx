import type { Metadata } from "next";
import { ModulePage } from "@/components/public/ModulePage";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Structured technical bootcamps and practical skill-building cohorts.",
};


export default function Page() {
  return (
    <ModulePage
      title="Training"
      description="Structured technical bootcamps and practical skill-building cohorts."
      moduleKey="training"
    />
  );
}
