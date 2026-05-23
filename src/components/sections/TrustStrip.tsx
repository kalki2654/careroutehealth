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
    <section className="site-grid border-y border-brand-border bg-white py-8 md:py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mint">
                <Icon className="h-5 w-5 text-brand-dark" strokeWidth={2} />
              </div>
              <p className="pt-1 text-sm font-medium leading-snug text-brand-dark/80 md:text-base">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
