"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

const blocks = [
  {
    icon: Shield,
    title: "Before you seek care",
    body: "We help you understand how your insurance works, whether a provider is likely to be in network, and what kind of care setting makes sense for your situation."
  },
  {
    icon: Calendar,
    title: "When you need care now",
    body: "If you are deciding between ER, urgent care, telehealth, or waiting for a primary care appointment, we help you think through the safest and most cost-aware next step."
  },
  {
    icon: FileText,
    title: "After you receive a bill",
    body: "If a charge feels too high, unclear, or unexpected, we help you review it, understand the likely issue, and identify practical next steps for reducing or disputing it."
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
            Help before care, during care, and after the bill arrives.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:text-lg">
            For many expats and international students, the hardest part of U.S. healthcare is not finding a hospital — it is understanding what to do, where to go, and how much it may cost. CareRoute helps you make smarter decisions before a problem becomes an expensive mistake.
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
            Get USA Care Guidance
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
