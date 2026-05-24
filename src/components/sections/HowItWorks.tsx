"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare, TrendingUp } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell us what you need",
    description: "Are you trying to navigate U.S. healthcare, or help family in India? Start with the path that fits your situation."
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Share a bit about your situation",
    description: "Answer a few quick questions about your insurance, the care you need, or your family's health situation."
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Get clear, practical guidance",
    description: "We'll help you understand your options, what things might cost, and what makes sense as a next step."
  },
  {
    number: "04",
    icon: ArrowRight,
    title: "Make decisions with less stress",
    description: "Move forward knowing you have support, clearer information, and someone to help if things get confusing."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="site-grid scroll-mt-24 bg-brand-cream py-16 md:py-24">
      <SectionReveal>
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
            How CareRoute works
          </p>
        </div>
        
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Here's how it works
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:text-lg">
            Whether you need help in the U.S. or support for family in India, the process is simple and personal.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-serif text-4xl font-bold text-brand-coral/20 md:text-5xl">
                    {step.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-soft">
                    <Icon className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-xl font-semibold text-brand-dark md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
