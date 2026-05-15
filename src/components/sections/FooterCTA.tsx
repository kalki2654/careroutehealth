"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FooterCTA() {
  return (
    <section className="site-grid bg-brand-dark py-10 text-white md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div className="max-w-5xl">
        <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">Start here</p>
        <h2 className="font-serif text-[2.12rem] font-semibold leading-[0.95] text-balance md:text-[clamp(3rem,7vw,7.5rem)] md:leading-[0.86]">
          You do not have to figure this out alone.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-white/80 md:mt-8 md:text-lg md:leading-8">
          Patients from across the world have trusted CareRoute to find the right treatment, in the right hospital,
          with full transparency at a cost that is real and honest. Let us show you what is possible.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-6 md:gap-4">
          <MagneticButton href="#assessment" variant="coral" className="w-full sm:w-auto">
            Start My Free Assessment
          </MagneticButton>
        </div>
        <p className="mt-4 text-xs font-semibold leading-5 text-white/70 md:mt-7 md:text-sm">
          No upfront payment. No pressure. No hidden commissions. Just honest guidance.
        </p>
      </div>
      </motion.div>
    </section>
  );
}
