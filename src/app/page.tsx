import { HomeHero } from "@/components/sections/HomeHero";
import { PathwayCards } from "@/components/sections/PathwayCards";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BenefitsByAudience } from "@/components/sections/BenefitsByAudience";
import { TrustSection } from "@/components/sections/TrustSection";
import { HomeFAQ } from "@/components/sections/HomeFAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <HomeHero />
      <PathwayCards />
      <HowItWorks />
      <BenefitsByAudience />
      <TrustSection />
      <HomeFAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
