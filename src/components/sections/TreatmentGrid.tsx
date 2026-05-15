"use client";

import {
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Eye,
  HeartPulse,
  Ribbon,
  SmilePlus,
  Syringe
} from "lucide-react";
import { motion } from "framer-motion";
import { treatments } from "@/lib/constants";
import { Carousel } from "@/components/ui/Carousel";

const iconMap = {
  ribbon: Ribbon,
  heart: HeartPulse,
  bone: Bone,
  baby: Baby,
  brain: Brain,
  syringe: Syringe,
  smile: SmilePlus,
  eye: Eye
};

function TreatmentCard({ treatment, index }: { treatment: typeof treatments[number]; index: number }) {
  const Icon = iconMap[treatment.icon as keyof typeof iconMap];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.58, delay: index * 0.04 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group h-full min-h-0 rounded-xl border border-brand-border bg-brand-cream/68 p-4 text-center transition-colors hover:bg-white hover:shadow-lift sm:min-h-[190px] sm:p-3 md:text-left md:min-h-[160px] md:p-5"
    >
      <div className="mb-3 flex items-start justify-center gap-4 sm:mb-2 sm:gap-3 md:mb-12 md:justify-between md:gap-6">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-teal/15 text-brand-teal shadow-soft sm:h-7 sm:w-7 md:h-12 md:w-12">
          <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5" strokeWidth={1.25} />
        </span>
        <span className="rounded-full border border-brand-border px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-brand-dark/50 sm:px-1.5 sm:text-[0.55rem] md:px-3 md:py-1 md:text-[0.7rem]">
          View
        </span>
      </div>
      <p className="text-sm font-semibold leading-tight text-brand-coral sm:text-xs md:text-base">{treatment.title}</p>
      <h3 className="mt-1 font-serif text-lg font-semibold leading-tight text-brand-dark sm:text-[0.95rem] md:mt-3 md:text-2xl">{treatment.subtitle}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-dark/78 sm:mt-1.5 sm:text-xs sm:leading-5 md:mt-4 md:text-sm md:leading-7">{treatment.body}</p>
      <a href="#assessment" className="mt-3 mx-auto inline-flex min-h-10 items-center gap-1 text-xs font-extrabold text-brand-dark sm:mt-2 sm:min-h-9 sm:text-[0.68rem] md:mx-0 md:mt-6 md:min-h-0 md:gap-2 md:text-sm">
        Check estimated cost
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1.5 md:h-4 md:w-4" strokeWidth={1.5} />
      </a>
    </motion.article>
  );
}

export function TreatmentGrid() {
  return (
    <section id="treatments" className="site-grid scroll-mt-24 bg-white py-10 md:scroll-mt-28 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div>
        <div className="mb-6 max-w-4xl text-center md:mb-12 md:text-left">
          <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">Treatments</p>
          <h2 className="font-serif text-[2.05rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(2.7rem,5vw,5.8rem)] md:leading-[0.9]">
            Treatments patients commonly seek in India
          </h2>
        </div>

        {/* Mobile + tablet: carousel */}
        <div className="xl:hidden">
          <Carousel controlsPlacement="bottom" slideClass="!basis-full sm:!basis-1/2 md:!basis-1/3">
            {treatments.map((treatment, index) => (
              <div key={treatment.title} className="h-full px-1.5 py-1 sm:px-2">
                <TreatmentCard treatment={treatment} index={index} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop: grid */}
        <div className="hidden xl:grid gap-4 xl:grid-cols-4">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.title} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
      </motion.div>
    </section>
  );
}
