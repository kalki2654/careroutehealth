"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HomeHero() {
  return (
    <section className="site-grid pt-0 md:pt-14">
      <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
      
      <div className="flex min-h-[60vh] flex-col items-center justify-center pb-16 pt-12 text-center md:min-h-[70vh] md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/70 px-4 py-2 text-xs font-semibold text-brand-dark/80 md:mb-6 md:px-5 md:py-2.5 md:text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-brand-coral" />
          Healthcare navigation for families across borders
        </motion.div>

        <TextReveal
          as="h1"
          text="Healthcare help for your family, wherever they are."
          className="mx-auto max-w-5xl font-serif text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-brand-dark md:text-[clamp(3.5rem,8vw,6rem)] md:leading-[0.92] md:tracking-[-0.02em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-dark/75 md:mt-8 md:text-lg md:leading-relaxed"
        >
          CareRoute helps expats, students, parents, and families navigate care, understand costs, and choose the right support in the U.S. and India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
        >
          <MagneticButton href="#pathways" variant="dark" className="min-h-12 px-8 md:min-h-14 md:px-10">
            Get Started
          </MagneticButton>
          <MagneticButton href="#how-it-works" variant="outline" className="min-h-12 px-8 md:min-h-14 md:px-10">
            See How It Works
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
