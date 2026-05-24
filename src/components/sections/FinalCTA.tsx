"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

interface FinalCTAProps {
  onOpenIntake: (path?: "usa" | "india") => void;
}

export function FinalCTA({ onOpenIntake }: FinalCTAProps) {
  return (
    <section className="site-grid bg-brand-cream py-12 sm:py-16 md:py-20 lg:py-24">
      <SectionReveal>
        <div className="rounded-2xl border border-brand-border bg-white p-6 text-center sm:p-8 md:p-12 lg:p-16">
          <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-brand-dark/70 sm:mt-4 sm:text-base md:mt-5 md:text-lg md:leading-relaxed">
            Whether you need help with U.S. healthcare or support for family in India, we're here to make things clearer and easier.
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 md:mt-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button
                onClick={() => onOpenIntake("usa")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-coral px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-coral/90 hover:shadow-lift sm:w-auto sm:px-8 sm:py-3.5 md:text-base"
              >
                USA Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button
                onClick={() => onOpenIntake("india")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-dark/90 hover:shadow-lift sm:w-auto sm:px-8 sm:py-3.5 md:text-base"
              >
                India Membership
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          <p className="mt-6 text-xs text-brand-dark/60 sm:mt-7 sm:text-sm md:mt-8 md:text-base">
            Clear guidance. Better decisions. Support when you need it.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
