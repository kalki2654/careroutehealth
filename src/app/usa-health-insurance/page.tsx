"use client";

import { motion } from "framer-motion";
import { Building2, DollarSign, FileText, MapPin, Shield } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/core/SectionReveal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { IntakeModal } from "@/components/intake/IntakeModal";
import { useIntakeModal } from "@/hooks/useIntakeModal";

const features = [
  {
    icon: Shield,
    title: "Understand your insurance",
    description: "Know what your plan actually covers before you need care. We explain deductibles, copays, and out-of-pocket limits in plain English."
  },
  {
    icon: MapPin,
    title: "Know where to go",
    description: "ER, urgent care, or your doctor? We help you figure out the right place for your situation—and save money in the process."
  },
  {
    icon: DollarSign,
    title: "Estimate costs upfront",
    description: "Get a realistic idea of what you'll pay before your visit. No more guessing or surprise bills weeks later."
  },
  {
    icon: Building2,
    title: "Find in-network options",
    description: "We help you find doctors and facilities that accept your insurance—so you pay less out of pocket."
  },
  {
    icon: FileText,
    title: "Handle surprise bills",
    description: "Got a bill that doesn't make sense? We help you understand it, negotiate when possible, and appeal denied claims."
  }
];

export default function USAHealthInsurance() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

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
            text="Stop guessing. Start understanding your healthcare."
            className="mx-auto max-w-5xl font-serif text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-brand-dark md:text-[clamp(3.5rem,8vw,6rem)] md:leading-[0.92] md:tracking-[-0.02em]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-8 md:text-lg md:leading-relaxed"
          >
            U.S. healthcare is confusing. We help you understand your insurance, know where to go, estimate costs before you visit, and avoid surprise bills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
          >
            <MagneticButton onClick={() => openModal("usa")} variant="coral" className="min-h-12 px-8 md:min-h-14 md:px-10">
              Talk to Us
            </MagneticButton>
            <MagneticButton href="#features" variant="outline" className="min-h-12 px-8 md:min-h-14 md:px-10">
              See How We Help
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="site-grid scroll-mt-24 bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
              What we help with
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
              Simple guidance for the parts of U.S. healthcare that confuse everyone
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
              Ready to make sense of your healthcare?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:mt-6 md:text-lg">
              Let's talk about your insurance and what you need help with
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-10">
              <MagneticButton onClick={() => openModal("usa")} variant="coral" className="min-h-12 px-8 md:min-h-14 md:px-10">
                Get in Touch
              </MagneticButton>
              <MagneticButton href="/" variant="outline" className="min-h-12 px-8 md:min-h-14 md:px-10">
                Back to Home
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </section>

      <SiteFooter />
      <IntakeModal isOpen={isOpen} onClose={closeModal} initialPath={initialPath} />
    </main>
  );
}
