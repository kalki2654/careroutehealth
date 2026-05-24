"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

const blocks = [
  {
    icon: Shield,
    title: "Before you go",
    body: "We help you understand what your insurance actually covers, whether a provider is in-network, and what kind of care makes sense for what you're dealing with."
  },
  {
    icon: Calendar,
    title: "When you need care now",
    body: "Should you go to the ER? Urgent care? Can this wait for a regular appointment? We help you think through the safest, smartest next step."
  },
  {
    icon: FileText,
    title: "After you get a bill",
    body: "If a charge feels wrong, too high, or just confusing, we help you figure out what happened and what you can do about it."
  }
];

export function USASupportDetails() {
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
            The hardest part of U.S. healthcare isn't finding a hospital. It's knowing what to do, where to go, and how much it'll actually cost. We help you avoid expensive mistakes before they happen.
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
          <Link
            href="/usa-health-insurance"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-coral px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-coral/90 md:text-base"
          >
            Get USA Support
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
