"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="site-grid pt-0 md:pt-14">
      <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
      
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pb-12 pt-12 text-center md:min-h-[65vh] md:pb-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/70 px-4 py-2 text-xs font-semibold text-brand-dark/80 md:mb-6 md:px-5 md:py-2.5 md:text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-brand-coral" />
          For families navigating healthcare across borders
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-5xl font-serif text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-brand-dark sm:text-[2.75rem] sm:leading-[1.1] md:text-[4rem] md:leading-[1.05] lg:text-[5rem]"
        >
          You shouldn't have to figure out healthcare alone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-7 md:text-lg md:leading-relaxed"
        >
          Whether you're confused by U.S. insurance or trying to help your parents in India, CareRoute helps you understand your options, avoid costly mistakes, and make better decisions with less stress.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 md:mt-9"
        >
          <Link
            href="#pathways"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-brand-dark/90 sm:w-auto sm:px-8 sm:py-3.5 md:text-base"
          >
            Find Your Path
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-dark bg-transparent px-6 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark hover:text-white sm:w-auto sm:px-8 sm:py-3.5 md:text-base"
          >
            How We Help
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
