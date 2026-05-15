"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/constants";

export function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faqs" className="site-grid scroll-mt-24 bg-white py-10 md:scroll-mt-28 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div className="grid gap-7 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">FAQs</p>
            <h2 className="font-serif text-[2.05rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(2.7rem,5vw,5.8rem)] md:leading-[0.9]">
              Questions patients ask before getting started
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question} className="border-b border-gray-200 py-2.5 md:py-5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-1 text-left md:gap-6"
                >
                  <span className="text-[0.95rem] font-medium leading-snug text-brand-dark md:text-base md:leading-tight">{faq.question}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-border text-brand-dark md:h-9 md:w-9">
                    {isOpen ? <Minus className="h-4 w-4" strokeWidth={1.5} /> : <Plus className="h-4 w-4" strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-4 pt-1 text-sm leading-6 text-brand-dark/78 md:pb-7 md:leading-7">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      </motion.div>
    </section>
  );
}
