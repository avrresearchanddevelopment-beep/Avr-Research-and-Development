import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectsView } from "@/components/public/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description: "Active R&D tracks, engineering systems and student projects built at AVR Research & Development.",
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsView />
    </Suspense>
  );
}
