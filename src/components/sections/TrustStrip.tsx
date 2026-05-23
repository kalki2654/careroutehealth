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
    <section className="site-grid border-y border-brand-border bg-white py-6 sm:py-8 md:py-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-mint sm:h-10 sm:w-10">
                <Icon className="h-4 w-4 text-brand-dark sm:h-5 sm:w-5" strokeWidth={2} />
              </div>
              <p className="pt-1 text-sm font-medium leading-snug text-brand-dark/85 sm:text-base">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
