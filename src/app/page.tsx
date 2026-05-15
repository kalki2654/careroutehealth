import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { StandardsSection } from "@/components/sections/StandardsSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { TreatmentGrid } from "@/components/sections/TreatmentGrid";
import { Assessment } from "@/components/sections/Assessment";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <Hero />
      <StatsSection />
      <StandardsSection />
      <ProcessTimeline />
      <ComparisonTable />
      <TreatmentGrid />
      <Assessment />
      <FAQAccordion />
      <FooterCTA />
      <SiteFooter />
    </main>
  );
}
