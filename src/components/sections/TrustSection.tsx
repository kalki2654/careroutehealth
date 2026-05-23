"use client";

import { motion } from "framer-motion";
import { Globe2, Lock, Shield, TrendingUp, Users } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const trustPoints = [
  {
    icon: Shield,
    title: "Safety-first guidance",
    description: "Evidence-based recommendations focused on your wellbeing"
  },
  {
    icon: TrendingUp,
    title: "Cost-aware recommendations",
    description: "Transparent pricing and help finding affordable options"
  },
  {
    icon: Users,
    title: "Support for care navigation",
    description: "Human guidance when healthcare feels overwhelming"
  },
  {
    icon: Globe2,
    title: "Designed for families across countries",
    description: "Specialized support for expats, students, and international families"
  },
  {
    icon: Lock,
    title: "Clear, simple, and private",
    description: "Your information stays secure and confidential"
  }
];

export function TrustSection() {
  return (
    <section className="site-grid bg-brand-dark py-16 text-white md:py-24">
      <SectionReveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold md:text-5xl">
            Built for clarity, privacy, and better decisions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Healthcare navigation you can trust, designed with your family in mind
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
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
