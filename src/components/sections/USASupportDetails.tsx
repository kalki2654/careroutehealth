"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Shield } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

interface USASupportDetailsProps {
  onOpenIntake: (path?: "usa" | "india") => void;
}

const blocks = [
  {
    icon: Shield,
    title: "Before you go",
    body: "You're not sure what your plan covers. You don't know if a provider is in-network. You're worried about getting hit with a huge bill later. We help you understand what your insurance actually pays for, what you'll owe, and whether the care you're considering makes sense for your situation."
  },
  {
    icon: Calendar,
    title: "When you need care now",
    body: "It's 9pm and something hurts. Should you go to the ER? Wait for urgent care in the morning? Call your doctor? You're not sure, and you're scared of making the wrong call—or paying thousands for the wrong one. We help you think through the safest, smartest next step."
  },
  {
    icon: FileText,
    title: "After you get a bill",
    body: "The bill arrived and the number doesn't make sense. It's way higher than you expected, or your insurance denied something they should have covered. You don't know if this is normal or if you should fight it. We help you figure out what happened, what's fair, and what you can actually do about it."
  }
];

export function USASupportDetails({ onOpenIntake }: USASupportDetailsProps) {
  return (
    <section className="site-grid bg-white py-16 md:py-24">
      <SectionReveal>
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
            USA Health Insurance Navigation
          </p>
        </div>
        
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            We help before, during, and after care
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:text-lg">
            The hardest part of U.S. healthcare isn't finding a hospital. It's knowing what to do, where to go, and how much it'll actually cost. Insurance terms are confusing. Bills are unpredictable. You're not sure if you should go to the ER or wait. We help you make better decisions and avoid expensive mistakes.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-brand-dark/60 md:text-base">
            Common situations: understanding your coverage, deciding between ER and urgent care, estimating costs before you book, finding in-network options, reviewing surprise bills.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="rounded-xl border border-brand-border bg-brand-cream p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-coral/10">
                  <Icon className="h-6 w-6 text-brand-coral" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-brand-dark md:text-2xl">
                  {block.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  {block.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm text-brand-dark/60 md:text-base">
            Whether you're an expat, student, or working professional—if U.S. healthcare feels confusing, we're here to help.
          </p>
          <button
            onClick={() => onOpenIntake("usa")}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-coral px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-coral/90 md:text-base"
          >
            Get USA Support
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
