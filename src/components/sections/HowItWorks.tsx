"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, TrendingUp } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Choose your path",
    description: "Select USA Health Insurance Navigation or India Health Access Membership based on where you need support"
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Get the right guidance",
    description: "Receive personalized support tailored to your specific healthcare situation and location"
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Move forward with confidence",
    description: "Make informed decisions with clear information, cost transparency, and ongoing support"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="site-grid scroll-mt-24 bg-brand-cream py-16 md:py-24">
      <SectionReveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            How CareRoute works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
            Simple, clear steps to get the healthcare support you need
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-serif text-5xl font-bold text-brand-coral/20 md:text-6xl">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft">
                    <Icon className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-xl font-semibold text-brand-dark md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-8 hidden h-0.5 w-10 bg-brand-border md:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
