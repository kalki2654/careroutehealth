import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PathwayCards } from "@/components/sections/PathwayCards";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { USASupportDetails } from "@/components/sections/USASupportDetails";
import { IndiaMembershipDetails } from "@/components/sections/IndiaMembershipDetails";
import { TrustSection } from "@/components/sections/TrustSection";
import { HomeFAQ } from "@/components/sections/HomeFAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <HomeHero />
      <TrustStrip />
      <PathwayCards />
      <HowItWorks />
      <USASupportDetails />
      <IndiaMembershipDetails />
      <TrustSection />
      <HomeFAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
