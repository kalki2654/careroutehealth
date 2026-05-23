"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/core/SectionReveal";

const pathways = [
  {
    id: "usa",
    eyebrow: "For expats, students, and families living in the U.S.",
    title: "Understand your coverage. Avoid costly mistakes.",
    body: "U.S. healthcare can be difficult to navigate, especially when you are dealing with insurance terms, urgent decisions, and unexpected bills. CareRoute helps you understand what your plan covers, where to go for the right level of care, what you may pay out of pocket, and what to do if a medical bill does not look right.",
    icon: Building2,
    benefits: [
      "Understand deductibles, copays, and in-network options in simple language",
      "Decide between ER, urgent care, primary care, telehealth, or self-care",
      "Get help estimating likely out-of-pocket costs before you go",
      "Compare lower-cost options when available",
      "Get support reviewing and reducing confusing or inflated bills"
    ],
    cta: "Explore USA Support",
    href: "/usa-health-insurance"
  },
  {
    id: "india",
    eyebrow: "For parents, family members, and support needs in India",
    title: "Make family healthcare in India easier to manage.",
    body: "When your parents or family members are in India, even routine healthcare can feel difficult to coordinate from abroad. CareRoute helps families get the right guidance, stay organized, and move through appointments, follow-ups, and care decisions with less confusion.",
    icon: Heart,
    benefits: [
      "Help finding the right type of care for your parent or family member",
      "Support with appointments, follow-ups, and routine coordination",
      "Clearer guidance for non-emergency health questions",
      "Ongoing support for families managing care from another country",
      "A simpler, calmer way to stay informed and involved"
    ],
    cta: "Explore India Membership",
    href: "/india-health-membership"
  }
];

export function PathwayCards() {
  return (
    <section id="pathways" className="site-grid scroll-mt-24 bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <SectionReveal>
        <div className="mb-3 text-center sm:mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-coral sm:text-sm">
            Choose your path
          </p>
        </div>
        
        <div className="mb-10 text-center sm:mb-12 md:mb-14 lg:mb-16">
          <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl md:text-4xl lg:text-5xl md:leading-tight">
            Two healthcare journeys. One trusted guide.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl px-4 text-sm leading-relaxed text-brand-dark/70 sm:mt-4 sm:text-base md:text-lg">
            CareRoute offers specialized support for two very different situations: navigating healthcare in the U.S., and helping your family access and coordinate care in India. Choose the path that fits where you need support today.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
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
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-cream p-6 shadow-soft transition-all duration-300 hover:shadow-lift sm:p-8 lg:p-10"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl sm:mb-6 sm:h-14 sm:w-14 ${isUSA ? "bg-brand-coral/10" : "bg-brand-mint"}`}>
                  <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${isUSA ? "text-brand-coral" : "text-brand-dark"}`} strokeWidth={1.5} />
                </div>

                <p className="mb-2 text-xs font-semibold text-brand-dark/70 sm:mb-3 sm:text-sm md:text-base">
                  {pathway.eyebrow}
                </p>

                <h3 className="mb-3 font-serif text-xl font-semibold leading-tight text-brand-dark sm:mb-4 sm:text-2xl lg:text-3xl">
                  {pathway.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-brand-dark/75 sm:mb-6 sm:text-base">
                  {pathway.body}
                </p>

                <ul className="mb-6 space-y-2.5 sm:mb-8 sm:space-y-3">
                  {pathway.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-brand-dark/80 sm:gap-3 sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark/40 sm:h-5 sm:w-5" strokeWidth={2} />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pathway.href}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 sm:w-auto sm:px-6 sm:py-3.5 ${
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
