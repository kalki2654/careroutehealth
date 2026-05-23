"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionReveal } from "@/components/core/SectionReveal";

const faqs = [
  {
    question: "Who is CareRoute for?",
    answer: "CareRoute is designed for expats, international students, parents, and families who need help navigating healthcare decisions in the U.S. or coordinating family healthcare support in India."
  },
  {
    question: "Is CareRoute a hospital, clinic, or insurance company?",
    answer: "No. CareRoute is a healthcare navigation and support service. We help you understand options, costs, and next steps so you can make more informed decisions."
  },
  {
    question: "Can you help me decide where to go for care in the U.S.?",
    answer: "Yes. We help you think through the right care setting based on your situation, such as ER, urgent care, primary care, telehealth, or waiting safely when appropriate."
  },
  {
    question: "Can you tell me exactly what my medical bill will be?",
    answer: "No one can guarantee an exact bill in every situation, but we can help you understand likely costs, common billing issues, and what questions to ask before you receive care."
  },
  {
    question: "What does the India membership help with?",
    answer: "The India Health Access Membership is designed for families supporting parents or loved ones in India. It helps with routine care coordination, appointments, follow-ups, and healthcare guidance from abroad."
  },
  {
    question: "Do you provide emergency medical treatment?",
    answer: "No. If you are having a medical emergency, call local emergency services or go to the nearest emergency department immediately. CareRoute supports navigation and coordination, not direct emergency treatment."
  },
  {
    question: "Is my information private?",
    answer: "Yes. We take privacy seriously and handle personal information carefully as part of the support experience."
  }
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="site-grid scroll-mt-24 bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <SectionReveal>
        <div className="mb-3 text-center sm:mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-coral sm:text-sm">
            Questions, answered
          </p>
        </div>
        
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl md:text-4xl lg:text-5xl">
            Everything you're wondering about
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl border border-brand-border bg-brand-cream shadow-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-white/50 sm:p-6 md:p-7"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-serif text-base font-semibold leading-snug text-brand-dark sm:text-lg md:text-xl">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand-dark sm:mt-1"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-brand-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6 md:px-7 md:pb-7">
                        <p className="text-sm leading-relaxed text-brand-dark/75 sm:text-base md:leading-relaxed">
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
