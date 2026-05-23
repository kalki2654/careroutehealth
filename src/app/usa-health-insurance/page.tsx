"use client";

import { motion } from "framer-motion";
import { Building2, DollarSign, FileText, MapPin, Shield } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/core/SectionReveal";
import { SiteFooter } from "@/components/sections/SiteFooter";

const features = [
  {
    icon: Shield,
    title: "Understand your insurance",
    description: "Get clear explanations of your coverage, deductibles, copays, and out-of-pocket maximums before you need care"
  },
  {
    icon: MapPin,
    title: "Know where to go",
    description: "Learn when to visit the ER, urgent care, primary care doctor, or handle issues at home—saving time and money"
  },
  {
    icon: DollarSign,
    title: "Estimate costs upfront",
    description: "Get realistic cost estimates before your visit and understand what you'll actually pay out of pocket"
  },
  {
    icon: Building2,
    title: "Find in-network options",
    description: "Locate lower-cost, in-network providers and facilities that accept your insurance"
  },
  {
    icon: FileText,
    title: "Reduce surprise bills",
    description: "Get help understanding and negotiating medical bills, and learn how to appeal denied claims"
  }
];

export default function USAHealthInsurance() {
  return (
    <main className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="site-grid pt-0 md:pt-14">
        <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
        
        <div className="flex min-h-[60vh] flex-col items-center justify-center pb-16 pt-12 text-center md:min-h-[70vh] md:pb-24 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/70 px-4 py-2 text-xs font-semibold text-brand-dark/80 md:mb-6 md:px-5 md:py-2.5 md:text-sm"
          >
            <Building2 className="h-4 w-4 text-brand-coral" />
            For expats and students in the U.S.
          </motion.div>

          <TextReveal
            as="h1"
            text="Navigate U.S. healthcare with confidence"
            className="mx-auto max-w-5xl font-serif text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-brand-dark md:text-[clamp(3.5rem,8vw,6rem)] md:leading-[0.92] md:tracking-[-0.02em]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-8 md:text-lg md:leading-relaxed"
          >
            Understand your insurance, know where to go for care, estimate costs before you visit, and avoid surprise bills. CareRoute helps expats and international students make sense of the U.S. healthcare system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
          >
            <MagneticButton href="#contact" variant="coral" className="min-h-12 px-8 md:min-h-14 md:px-10">
              Get Started
            </MagneticButton>
            <MagneticButton href="#features" variant="outline" className="min-h-12 px-8 md:min-h-14 md:px-10">
              Learn More
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="site-grid scroll-mt-24 bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
              How we help
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
              Clear guidance for navigating U.S. health insurance and healthcare
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-xl border border-brand-border bg-brand-cream p-6 transition-all duration-300 hover:shadow-soft md:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-coral/10">
                    <Icon className="h-6 w-6 text-brand-coral" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-dark md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>
      </section>

      {/* CTA Section */}
      <section id="contact" className="site-grid scroll-mt-24 bg-brand-cream py-16 md:py-24">
        <SectionReveal>
          <div className="rounded-2xl border border-brand-border bg-white p-8 text-center md:p-16">
            <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
              Ready to navigate U.S. healthcare with confidence?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:mt-6 md:text-lg">
              Get personalized guidance for your insurance and healthcare needs
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-10">
              <MagneticButton href="mailto:hello@careroute.health" variant="coral" className="min-h-12 px-8 md:min-h-14 md:px-10">
                Contact Us
              </MagneticButton>
              <MagneticButton href="/" variant="outline" className="min-h-12 px-8 md:min-h-14 md:px-10">
                Back to Home
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </section>

      <SiteFooter />
    </main>
  );
}
