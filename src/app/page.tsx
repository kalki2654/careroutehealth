"use client";

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
import { IntakeModal } from "@/components/intake/IntakeModal";
import { useIntakeModal } from "@/hooks/useIntakeModal";

export default function Home() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <main className="pb-16 md:pb-0">
      <HomeHero onOpenIntake={openModal} />
      <TrustStrip />
      <PathwayCards onOpenIntake={openModal} />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="usa-support">
        <USASupportDetails onOpenIntake={openModal} />
      </section>
      <section id="india-membership">
        <IndiaMembershipDetails onOpenIntake={openModal} />
      </section>
      <TrustSection />
      <section id="faq">
        <HomeFAQ />
      </section>
      <FinalCTA onOpenIntake={openModal} />
      <SiteFooter />
      <IntakeModal isOpen={isOpen} onClose={closeModal} initialPath={initialPath} />
    </main>
  );
}
