import type { Metadata } from "next";
import { ModulePage } from "@/components/public/ModulePage";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Hands-on R&D internship programs across AI, web engineering and data analytics.",
};


export default function Page() {
  return (
    <ModulePage
      title="Internships"
      description="Hands-on R&D internship programs across AI, web engineering, and data analytics."
      moduleKey="internships"
    />
  );
}
