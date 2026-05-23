"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const faqs = [
  {
    question: "Who is USA Health Insurance Navigation for?",
    answer: "This service is designed for expats and international students living in the U.S. who need help understanding their health insurance, navigating the healthcare system, estimating costs, and avoiding surprise bills."
  },
  {
    question: "Who should use India Health Access Membership?",
    answer: "This membership is for families who have parents or loved ones in India and need help coordinating their healthcare—from finding the right doctors to managing appointments and understanding treatment options."
  },
  {
    question: "Is CareRoute for emergencies?",
    answer: "No, CareRoute is not an emergency service. If you have a medical emergency, call 911 (in the U.S.) or your local emergency number. CareRoute helps with planning, navigation, and non-urgent healthcare decisions."
  },
  {
    question: "Can CareRoute help reduce healthcare costs?",
    answer: "Yes. We help you understand your insurance coverage, find in-network providers, estimate out-of-pocket costs before visits, and identify lower-cost care options. For families in India, we help coordinate affordable, quality care."
  },
  {
    question: "Does CareRoute work for families in different countries?",
    answer: "Absolutely. CareRoute is specifically designed for families spread across borders—whether you're an expat in the U.S. or supporting family members in India, we provide specialized guidance for both situations."
  }
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="site-grid scroll-mt-24 bg-brand-cream py-16 md:py-24">
      <SectionReveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-5xl">
            Everything you're wondering about
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 md:text-lg">
            Quick answers to common questions about CareRoute
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-brand-cream/30 md:p-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-semibold text-brand-dark md:text-xl">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand-dark"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-brand-border px-6 pb-6 pt-4 md:px-8 md:pb-8">
                        <p className="text-sm leading-relaxed text-brand-dark/70 md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
