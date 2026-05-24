"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Globe2, TrendingUp } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

interface IndiaMembershipDetailsProps {
  onOpenIntake: (path?: "usa" | "india") => void;
}

const blocks = [
  {
    icon: Calendar,
    title: "Help with appointments and follow-ups",
    body: "We help coordinate appointments, make sure follow-ups happen, and answer routine health questions so nothing falls through the cracks."
  },
  {
    icon: Globe2,
    title: "Support when you're far away",
    body: "Distance, time zones, and language barriers make everything harder. We help you stay informed and involved even when you can't be there in person."
  },
  {
    icon: TrendingUp,
    title: "A clearer path forward",
    body: "From the first question to the next appointment, we help your family move through health decisions in a calmer, more organized way."
  }
];

export function IndiaMembershipDetails({ onOpenIntake }: IndiaMembershipDetailsProps) {
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
            Make it easier to care for family in India
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-dark/70 md:text-lg">
            When you live in another country, even small healthcare tasks for your parents feel overwhelming. We help you stay organized, get the right guidance, and feel more confident about the care they're getting.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-brand-dark/80 md:text-base">
            Membership includes ongoing support, appointment help, and guidance for routine healthcare needs.
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
          <button
            onClick={() => onOpenIntake("india")}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-dark/90 md:text-base"
          >
            Get India Support
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
