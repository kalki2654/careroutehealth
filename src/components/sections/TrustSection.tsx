"use client";

import { motion } from "framer-motion";
import { DollarSign, Globe2, Lock, Shield, Users } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const trustPoints = [
  {
    icon: Shield,
    title: "Safety-first guidance",
    description: "We help you think through the safest next step, not just the cheapest one."
  },
  {
    icon: DollarSign,
    title: "Cost-aware recommendations",
    description: "We focus on avoiding unnecessary spending while still protecting your health and wellbeing."
  },
  {
    icon: Users,
    title: "Human support",
    description: "You are not left alone to decode insurance language, care settings, or family coordination challenges."
  },
  {
    icon: Globe2,
    title: "Designed for cross-border families",
    description: "CareRoute is built for people navigating healthcare across countries, systems, and time zones."
  },
  {
    icon: Lock,
    title: "Private by design",
    description: "Your information is handled carefully and shared only as needed to support your care decisions."
  }
];

export function TrustSection() {
  return (
    <section className="site-grid bg-brand-dark py-16 text-white md:py-24">
      <SectionReveal>
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
            Why families choose CareRoute
          </p>
        </div>
        
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold md:text-5xl">
            Built for clarity, privacy, and better healthcare decisions.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Healthcare feels overwhelming when the stakes are high and the system is unclear. CareRoute is designed to make decisions easier, information clearer, and support more human.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {trustPoints.slice(0, 3).map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint">
                  <Icon className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-8">
          {trustPoints.slice(3).map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint">
                  <Icon className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
