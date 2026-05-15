"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Star } from "lucide-react";
import { standards } from "@/lib/constants";
import { SectionReveal } from "@/components/core/SectionReveal";

const stagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }
  })
};

export function StandardsSection() {
  return (
    <section id="standards" className="site-grid scroll-mt-24 bg-white py-10 md:mt-0 md:scroll-mt-28 md:pb-14 md:pt-10">
      <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="flex h-full flex-col gap-2.5 lg:gap-6 lg:sticky lg:top-24">
            <motion.div custom={0} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="min-h-0 rounded-2xl bg-[#014E4E]/8 p-3.5 md:min-h-[220px] md:p-8">
              <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-brand-teal">Our Commitment</p>
              <p className="font-serif text-base font-semibold leading-snug text-brand-dark md:text-lg">We work only for you — never for hospitals.</p>
              <div className="mt-3 flex flex-col gap-2 md:mt-4 md:gap-3">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-xs font-semibold text-brand-dark/85">No undisclosed commissions</span>

                
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-xs font-semibold text-brand-dark/85">Patient-first shortlisting</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-xs font-semibold text-brand-dark/85">Full cost transparency before you decide</span>
                </div>
              </div>
            </motion.div>
            <motion.div custom={1} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center justify-center rounded-2xl bg-brand-dark p-3.5 text-center shadow-lift md:rounded-[1.5rem] md:p-10">
              <p className="font-serif text-4xl font-semibold leading-none text-brand-coral md:text-8xl">&ldquo;</p>
              <p className="mt-2 max-w-md font-serif text-base font-semibold leading-[1.05] text-white md:mt-4 md:text-lg">
                We measure success by the trust our patients place in us, not by commissions earned.
              </p>
              <p className="mt-4 text-xs font-extrabold text-brand-coral md:mt-6 md:text-sm">&mdash; CareRoute Health</p>
              <div className="mt-4 border-t border-white/15 pt-3 md:mt-8 md:pt-6">
                <p className="text-xs font-bold leading-relaxed text-white/70 md:text-sm">
                  Patient-first guidance.<br />
                  Always transparent.<br />
                  Never commissioned.
                </p>
              </div>
            </motion.div>
            <motion.div custom={2} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-brand-border bg-brand-cream/60 p-2.5 shadow-sm md:p-6">
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Award className="h-4 w-4 text-brand-teal md:h-5 md:w-5" strokeWidth={1.25} />
                  <span className="text-[0.55rem] font-extrabold uppercase tracking-widest text-brand-teal/90 md:text-[0.6rem]">NABH Accredited</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Star className="h-4 w-4 text-brand-teal md:h-5 md:w-5" strokeWidth={1.25} />
                  <span className="text-[0.55rem] font-extrabold uppercase tracking-widest text-brand-teal/90 md:text-[0.6rem]">JCI Standards</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Globe className="h-4 w-4 text-brand-teal md:h-5 md:w-5" strokeWidth={1.25} />
                  <span className="text-[0.55rem] font-extrabold uppercase tracking-widest text-brand-teal/90 md:text-[0.6rem]">30+ Countries</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionReveal>
            <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">Why CareRoute</p>
            <h2 className="max-w-4xl font-serif text-[2.05rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(2.7rem,5vw,5.8rem)] md:leading-[0.9]">
              We are your patient advocate. Not a hospital broker.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-dark/85 md:mt-7 md:text-lg md:leading-8">
              Most medical tourism companies are paid by hospitals to send patients there. That means their
              recommendations can be driven by commission, not by what is right for you. CareRoute works differently.
            </p>
          </SectionReveal>

          <div className="mt-5 grid h-full gap-2.5 sm:grid-cols-2 md:mt-10 md:gap-3">
            {standards.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="h-full min-h-0 rounded-xl border border-brand-border bg-brand-cream p-4 md:min-h-56 md:p-6">
                  <ShieldCheck className="mb-3 h-6 w-6 text-brand-coral md:mb-8" strokeWidth={1.25} />
                  <h3 className="font-serif text-xl font-semibold leading-tight text-brand-dark md:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-dark/78 md:mt-3 md:leading-7">{item.body}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-brand-dark/65 md:mt-6 md:leading-7">
            CareRoute Health is a patient coordination and guidance service. We are not a hospital, clinic, or
            licensed medical provider. All medical decisions are made solely by qualified healthcare professionals.
            Treatment outcomes cannot be guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
