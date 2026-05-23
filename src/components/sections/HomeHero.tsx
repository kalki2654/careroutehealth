"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
          Healthcare navigation across borders
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-5xl font-serif text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-brand-dark sm:text-[2.75rem] md:text-[4rem] lg:text-[5rem] md:leading-[1.05]"
        >
          Healthcare help for your family, wherever they are
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-7 md:text-lg md:leading-relaxed"
        >
          CareRoute helps expats, students, parents, and families navigate care, understand costs, and choose the right support in the U.S. and India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center md:mt-9"
        >
          <MagneticButton 
            href="#pathways" 
            variant="dark" 
            className="w-full min-h-12 px-6 sm:w-auto md:min-h-14 md:px-10"
          >
            Get Started
          </MagneticButton>
          <MagneticButton 
            href="#how-it-works" 
            variant="outline" 
            className="w-full min-h-12 px-6 sm:w-auto md:min-h-14 md:px-10"
          >
            See How It Works
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
