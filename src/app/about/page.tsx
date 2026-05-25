"use client";

import { motion } from "framer-motion";
import { Building2, Heart, Shield, Users } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { IntakeModal } from "@/components/intake/IntakeModal";
import { useIntakeModal } from "@/hooks/useIntakeModal";

export default function AboutPage() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="site-grid bg-brand-cream pt-[calc(var(--mobile-nav-clearance,96px)+1rem)] md:pt-36">
        <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
        
        <div className="mx-auto max-w-4xl pb-16 pt-12 text-center md:pb-24 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/70 px-4 py-2 text-xs font-semibold text-brand-dark/80 md:mb-6 md:px-5 md:py-2.5 md:text-sm"
          >
            About CareRoute
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-[2.5rem] font-semibold leading-[1.1] text-brand-dark md:text-[4rem] md:leading-[1.05]"
          >
            Healthcare guidance made clearer, calmer, and easier to navigate
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-8 md:text-lg"
          >
            CareRoute helps expats, students, parents, and families make better healthcare decisions in the U.S. and India—with clearer information, cost-aware guidance, and support that feels human.
          </motion.p>
        </div>
      </section>

      {/* What CareRoute Does */}
      <section className="site-grid bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
              What CareRoute does
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-brand-dark/70 md:text-lg">
              <p>
                We help people understand confusing healthcare decisions. Whether you're trying to figure out U.S. insurance or supporting family in India, healthcare can feel overwhelming. We make it clearer.
              </p>
              <p>
                We don't provide medical treatment. We're not a hospital, clinic, or insurance company. We're a healthcare navigation and support platform—here to help you make better decisions with less stress.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Who It's For */}
      <section className="site-grid bg-brand-cream py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-semibold text-brand-dark md:mb-12 md:text-5xl">
              Who CareRoute is for
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-brand-border bg-white p-6 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-coral/10">
                  <Building2 className="h-6 w-6 text-brand-coral" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-brand-dark">
                  USA Health Insurance Navigation
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  For expats, students, and working professionals in the U.S. who need help understanding their insurance, deciding where to go for care, estimating costs, or reviewing medical bills.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-white p-6 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint">
                  <Heart className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-brand-dark">
                  India Health Access Membership
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  For families managing healthcare for parents or loved ones in India from abroad. We help coordinate appointments, track follow-ups, and provide ongoing support so nothing falls through the cracks.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Why CareRoute Exists */}
      <section className="site-grid bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
              Why CareRoute exists
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-brand-dark/70 md:text-lg">
              <p>
                Healthcare is hard to navigate—especially when you're in a new country, dealing with unfamiliar systems, or trying to help family from far away.
              </p>
              <p>
                Insurance terms are confusing. Bills are unpredictable. You're not sure where to go or who to trust. And when you're managing care for someone else across borders, even small tasks feel overwhelming.
              </p>
              <p>
                CareRoute exists to make this easier. We believe healthcare decisions should feel clearer, not more stressful. We're here to help you understand your options, avoid costly mistakes, and feel more confident about the care you or your family receives.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* How We're Different */}
      <section className="site-grid bg-brand-cream py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-semibold text-brand-dark md:mb-12 md:text-5xl">
              How CareRoute is different
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-white">
                  <Shield className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                    We focus on clarity, not complexity
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    We explain things in plain English. No jargon. No confusing medical or insurance language. Just clear, practical guidance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-white">
                  <Users className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                    We're cost-aware and transparent
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    We help you understand what things actually cost and how to avoid surprise bills. We're upfront about how our service works and what you can expect.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-white">
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                    We're here for the long term
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    Healthcare isn't a one-time thing. We provide ongoing support—whether that's helping you navigate U.S. insurance over time or coordinating care for your family in India month after month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* CTA */}
      <section className="site-grid bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-brand-border bg-brand-cream p-8 text-center md:p-16">
            <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
              Whether you need help with U.S. healthcare or support for family in India, we're here to make things clearer and easier.
            </p>
            <button
              onClick={() => openModal()}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-brand-dark/90 md:text-base"
            >
              Get Started
            </button>
          </div>
        </SectionReveal>
      </section>

      <SiteFooter />
      <IntakeModal isOpen={isOpen} onClose={closeModal} initialPath={initialPath} />
    </main>
  );
}
