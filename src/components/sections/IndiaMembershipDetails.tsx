"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Globe2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

const blocks = [
  {
    icon: Calendar,
    title: "Routine care coordination",
    body: "Get help with appointments, follow-ups, health questions, and staying on top of ongoing needs."
  },
  {
    icon: Globe2,
    title: "Family support from abroad",
    body: "Stay informed even when you are not physically there. CareRoute helps reduce the confusion that often comes with distance, time zones, and fragmented care."
  },
  {
    icon: TrendingUp,
    title: "A clearer path forward",
    body: "From the first question to the next appointment, we help families move through health decisions in a calmer, more structured way."
  }
];

export function IndiaMembershipDetails() {
  return (
    <section className="site-grid bg-brand-cream py-16 md:py-24">
      <SectionReveal>
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
            India Health Access Membership
          </p>
        </div>
        
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Support for families managing healthcare in India from abroad.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:text-lg">
            When you live outside India, even small healthcare tasks for your parents or loved ones can become stressful. CareRoute helps families stay organized, supported, and more confident in routine care decisions and coordination.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-brand-dark/80 md:text-base">
            Membership includes ongoing support, appointment coordination, and guidance for routine healthcare needs.
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
                className="rounded-xl border border-brand-border bg-white p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint">
                  <Icon className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
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
            href="/india-health-membership"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-dark/90 md:text-base"
          >
            Explore India Membership
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
