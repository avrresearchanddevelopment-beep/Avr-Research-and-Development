import type { Metadata } from "next";
import { ModulePage } from "@/components/public/ModulePage";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Focused lab sessions on applied AI, automation and web deployment.",
};


export default function Page() {
  return (
    <ModulePage
      title="Workshops"
      description="Focused lab sessions on applied AI, automation, and static web deployment."
      moduleKey="workshops"
    />
  );
}
