"use client";

import { motion } from "framer-motion";
import { AlertCircle, Building2, Heart, HelpCircle, Mail } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { IntakeModal } from "@/components/intake/IntakeModal";
import { useIntakeModal } from "@/hooks/useIntakeModal";

export default function ContactPage() {
  const { isOpen, initialPath, openModal, closeModal } = useIntakeModal();

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="site-grid bg-brand-cream pt-[calc(var(--mobile-nav-clearance,96px)+1rem)] md:pt-36">
        <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
        
        <div className="mx-auto max-w-4xl pb-16 pt-12 text-center md:pb-24 md:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-[2.5rem] font-semibold leading-[1.1] text-brand-dark md:text-[4rem] md:leading-[1.05]"
          >
            Get in touch with CareRoute
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-8 md:text-lg"
          >
            Questions about U.S. healthcare support, India family care membership, or how CareRoute works? Reach out and we'll help you find the right next step.
          </motion.p>
        </div>
      </section>

      {/* What You Can Contact Us About */}
      <section className="site-grid bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-brand-dark md:mb-12 md:text-3xl">
              You can contact us about
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex gap-4 rounded-xl border border-brand-border bg-brand-cream p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-coral/10">
                  <Building2 className="h-5 w-5 text-brand-coral" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-dark">
                    USA Health Insurance Navigation
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70">
                    Help understanding your insurance, deciding where to go for care, estimating costs, or reviewing bills
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-brand-border bg-brand-cream p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint">
                  <Heart className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-dark">
                    India Health Access Membership
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70">
                    Support for coordinating healthcare for family in India from abroad
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-brand-border bg-brand-cream p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-dark/10">
                  <HelpCircle className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-dark">
                    General questions
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70">
                    How CareRoute works, pricing, or which support path is right for you
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-brand-border bg-brand-cream p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-dark/10">
                  <Mail className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-dark">
                    Partnership inquiries
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70">
                    Business partnerships, media inquiries, or other collaboration opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Contact Options */}
      <section className="site-grid bg-brand-cream py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-brand-dark md:mb-12 md:text-3xl">
              How to reach us
            </h2>

            <div className="space-y-6">
              {/* Guided Intake (Recommended) */}
              <div className="rounded-xl border-2 border-brand-coral bg-white p-6 md:p-8">
                <div className="mb-4 inline-flex rounded-full bg-brand-coral/10 px-3 py-1 text-xs font-semibold text-brand-coral">
                  Recommended
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-dark">
                  Start with our guided intake
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  The fastest way to get help. Answer a few quick questions so we can understand your situation and route you to the right support.
                </p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-coral px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-coral/90"
                >
                  Get Started
                </button>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-brand-border bg-white p-6 md:p-8">
                <h3 className="mb-2 text-xl font-semibold text-brand-dark">
                  Email us directly
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  For general inquiries, partnership questions, or if you prefer email.
                </p>
                <a
                  href="mailto:hello@careroute.health"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-coral hover:text-brand-coral/80 md:text-base"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  hello@careroute.health
                </a>
                <p className="mt-3 text-xs text-brand-dark/60 md:text-sm">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Emergency Disclaimer */}
      <section className="site-grid bg-white py-16 md:py-24">
        <SectionReveal>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border-2 border-brand-coral/20 bg-brand-coral/5 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-coral/10">
                  <AlertCircle className="h-5 w-5 text-brand-coral" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                    Medical emergency?
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    CareRoute does not provide emergency medical treatment. If you are experiencing a medical emergency, contact local emergency services immediately.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/70 md:text-base">
                    In the U.S., call 911. In India, call 102 or 108.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <SiteFooter />
      <IntakeModal isOpen={isOpen} onClose={closeModal} initialPath={initialPath} />
    </main>
  );
}
