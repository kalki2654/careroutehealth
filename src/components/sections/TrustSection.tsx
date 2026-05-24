"use client";

import { motion } from "framer-motion";
import { DollarSign, Globe2, Lock, Shield, Users } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const trustPoints = [
  {
    icon: Shield,
    title: "Safety comes first",
    description: "We help you think through the safest next step—not just the cheapest one."
  },
  {
    icon: DollarSign,
    title: "We care about costs",
    description: "We focus on helping you avoid unnecessary spending while still protecting your health."
  },
  {
    icon: Users,
    title: "Real people, real support",
    description: "You're not left alone to decode insurance jargon or figure out care coordination on your own."
  },
  {
    icon: Globe2,
    title: "Built for families across borders",
    description: "We understand what it's like to navigate healthcare across countries, systems, and time zones."
  },
  {
    icon: Lock,
    title: "Your information stays private",
    description: "We handle your health information carefully and only share what's needed to support your care."
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
            Why families trust CareRoute
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Healthcare feels overwhelming when the stakes are high and the system is confusing. We're here to make decisions easier, information clearer, and support more human.
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
