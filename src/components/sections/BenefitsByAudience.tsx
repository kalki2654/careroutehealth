"use client";

import { motion } from "framer-motion";
import { DollarSign, Globe2, HeartHandshake, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const audiences = [
  {
    title: "For people in the U.S.",
    icon: MapPin,
    benefits: [
      {
        icon: DollarSign,
        title: "Insurance navigation",
        description: "Understand your coverage and avoid surprise bills"
      },
      {
        icon: HeartHandshake,
        title: "Care routing",
        description: "Know exactly where to go for the right level of care"
      },
      {
        icon: Globe2,
        title: "Cost clarity",
        description: "Get estimates before you visit and find lower-cost options"
      }
    ]
  },
  {
    title: "For families in India",
    icon: HeartHandshake,
    benefits: [
      {
        icon: MapPin,
        title: "Access coordination",
        description: "Help finding the right care for your parents and family"
      },
      {
        icon: HeartHandshake,
        title: "Ongoing support",
        description: "Guidance for appointments, follow-ups, and health questions"
      },
      {
        icon: Globe2,
        title: "Care navigation",
        description: "Support across health needs without confusion"
      }
    ]
  }
];

export function BenefitsByAudience() {
  return (
    <section className="site-grid bg-white py-16 md:py-24">
      <SectionReveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Why families use CareRoute
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
            Practical support tailored to where you are and what you need
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {audiences.map((audience, audienceIndex) => {
            const AudienceIcon = audience.icon;
            
            return (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: audienceIndex * 0.15 }}
                className="rounded-2xl border border-brand-border bg-brand-cream p-8 md:p-10"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mint">
                    <AudienceIcon className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-brand-dark md:text-2xl">
                    {audience.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {audience.benefits.map((benefit, benefitIndex) => {
                    const BenefitIcon = benefit.icon;
                    
                    return (
                      <div key={benefitIndex} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                          <BenefitIcon className="h-4 w-4 text-brand-coral" strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="mb-1 text-sm font-semibold text-brand-dark md:text-base">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-brand-dark/70">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
