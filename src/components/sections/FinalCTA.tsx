"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

export function FinalCTA() {
  return (
    <section className="site-grid bg-brand-cream py-16 md:py-24">
      <SectionReveal>
        <div className="rounded-2xl border border-brand-border bg-white p-8 text-center md:p-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Choose the right support for where you are.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:mt-6 md:text-lg">
            Whether you need help navigating U.S. healthcare or supporting family in India, CareRoute is here to make the process clearer, calmer, and easier to manage.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#pathways"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-dark/90 hover:shadow-lift md:text-base"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#pathways"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-dark bg-transparent px-8 py-4 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark hover:text-white md:text-base"
              >
                Explore Your Path
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <p className="mt-8 text-sm text-brand-dark/60 md:text-base">
            Clear guidance. Better decisions. Support you can trust.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
