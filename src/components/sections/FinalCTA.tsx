"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

export function FinalCTA() {
  return (
    <section className="site-grid bg-white py-16 md:py-24">
      <SectionReveal>
        <div className="rounded-2xl border border-brand-border bg-brand-cream p-8 text-center md:p-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Choose the right support for where you are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:mt-6 md:text-lg">
            Whether you need help navigating U.S. healthcare or supporting family in India, CareRoute is here to guide you
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/usa-health-insurance"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-coral px-8 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-coral/90 hover:shadow-lift md:text-base"
              >
                Explore USA Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/india-health-membership"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-dark/90 hover:shadow-lift md:text-base"
              >
                Explore India Membership
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
