"use client";

import { motion } from "framer-motion";
import { CheckCircle2, DollarSign, Globe2, Lock } from "lucide-react";

const trustItems = [
  {
    icon: CheckCircle2,
    text: "Clear guidance before you book care"
  },
  {
    icon: DollarSign,
    text: "Cost transparency before and after treatment"
  },
  {
    icon: Globe2,
    text: "Support for U.S. and India healthcare decisions"
  },
  {
    icon: Lock,
    text: "Private, family-first navigation"
  }
];

export function TrustStrip() {
  return (
    <section className="site-grid bg-brand-cream py-8 md:py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3 rounded-lg border border-brand-border bg-white/50 p-4 md:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint">
                <Icon className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium leading-snug text-brand-dark md:text-base">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
