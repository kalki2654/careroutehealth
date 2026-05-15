"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClipboardList, FileLock2, Hospital, Plane, ReceiptText } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";
import { processSteps } from "@/lib/constants";
import { Carousel } from "@/components/ui/Carousel";

const icons = [ClipboardList, FileLock2, Hospital, ReceiptText, Plane];

function ProcessCard({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  const Icon = icons[index];
  return (
    <motion.article
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full min-h-[320px] w-full max-w-full flex-col rounded-xl border border-white/12 bg-white/[0.06] p-4 text-white shadow-soft backdrop-blur sm:min-h-[360px] md:min-h-0 md:p-9"
    >
      <div className="mb-4 flex items-center justify-between gap-3 md:mb-12 md:gap-6">
        <span className="text-xs font-extrabold uppercase text-brand-coral md:text-sm">{step.eyebrow}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/14 bg-white/10 md:h-12 md:w-12">
          <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.25} />
        </span>
      </div>
      <p className="font-serif text-3xl font-semibold leading-none text-white/28 md:text-6xl">0{index + 1}</p>
      <h3 className="mt-3 max-w-xl font-serif text-xl font-semibold leading-tight text-balance md:mt-6 md:text-4xl md:leading-[0.98]">{step.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:mt-5 md:text-base md:leading-8">{step.body}</p>
    </motion.article>
  );
}

export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { void emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    setActive(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <section id="how" className="site-grid scroll-mt-24 bg-brand-dark py-10 text-white md:scroll-mt-28 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-soft backdrop-blur md:p-7 lg:sticky lg:top-24">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-widest text-brand-coral">How It Works</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-5xl md:leading-[1.05]">
              Your medical journey, guided at every step.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/80 md:mt-5 md:text-base md:leading-7">
              You handle nothing alone. From your first message to your last follow-up, CareRoute is beside you.
            </p>
            <a
              href="#assessment"
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-coral px-5 text-sm font-bold text-brand-ink transition-all hover:bg-brand-coral/90 md:mt-8"
            >
              Start Free Assessment &rarr;
            </a>
            <div className="mt-2 md:mt-6" />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          {/* Mobile: carousel */}
          <div className="lg:hidden">
            <Carousel controlsPlacement="bottom" showDots showArrows onEmblaApi={setEmblaApi} slideClass="!basis-full sm:!basis-1/2">
              {processSteps.map((step, index) => (
                <div key={step.title} className="h-full px-1.5 py-1 sm:px-2">
                  <ProcessCard step={step} index={index} />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Desktop: vertical cards */}
          <div className="hidden space-y-6 lg:block">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.title} step={step} index={index} />
            ))}
          </div>

          <p className="mt-4 rounded-xl border border-white/12 bg-white/[0.06] p-4 font-serif text-lg font-semibold leading-tight text-white md:mt-8 md:p-7 md:text-3xl">
            You do not need to know India. You do not need to know the hospitals. That is exactly what we are here for.
          </p>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
