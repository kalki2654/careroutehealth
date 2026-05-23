"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

const pathways = [
  {
    id: "usa",
    title: "USA Health Insurance Navigation",
    subtitle: "For expats and students living in the U.S.",
    icon: Building2,
    benefits: [
      "Understand your insurance before you need care",
      "Know where to go: ER, urgent care, doctor, or self-care",
      "Estimate out-of-pocket costs before you visit",
      "Find lower-cost in-network options",
      "Get help reducing surprise bills after care"
    ],
    cta: "Explore USA Support",
    href: "/usa-health-insurance",
    color: "coral"
  },
  {
    id: "india",
    title: "India Health Access Membership",
    subtitle: "For parents and families in India",
    icon: Heart,
    benefits: [
      "Get help finding the right care for your parents and family",
      "Access guidance for appointments, follow-ups, and local care options",
      "Coordinate support for routine needs and health questions",
      "Make healthcare easier for family members who may need extra help",
      "Stay informed and supported without confusion"
    ],
    cta: "Explore India Membership",
    href: "/india-health-membership",
    color: "mint"
  }
];

export function PathwayCards() {
  return (
    <section id="pathways" className="site-grid scroll-mt-24 bg-white py-16 md:py-24">
      <SectionReveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Choose your path
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
            CareRoute offers specialized support for two distinct healthcare journeys
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;
            const isUSA = pathway.id === "usa";
            
            return (
              <motion.article
                key={pathway.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-cream p-8 shadow-soft transition-all duration-300 hover:shadow-lift md:p-10"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${isUSA ? "bg-brand-coral/10" : "bg-brand-mint"}`}>
                  <Icon className={`h-7 w-7 ${isUSA ? "text-brand-coral" : "text-brand-dark"}`} strokeWidth={1.5} />
                </div>

                <h3 className="mb-2 font-serif text-2xl font-semibold text-brand-dark md:text-3xl">
                  {pathway.title}
                </h3>
                <p className="mb-6 text-sm font-medium text-brand-dark/60 md:text-base">
                  {pathway.subtitle}
                </p>

                <ul className="mb-8 space-y-3">
                  {pathway.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-dark/80 md:text-base">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark/40" strokeWidth={2} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pathway.href}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    isUSA
                      ? "bg-brand-coral text-white hover:bg-brand-coral/90"
                      : "bg-brand-dark text-white hover:bg-brand-dark/90"
                  }`}
                >
                  {pathway.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-5 ${isUSA ? "bg-brand-coral" : "bg-brand-mint"}`} />
              </motion.article>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
