"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { BadgeCheck, Clock3, LockKeyhole, ShieldCheck, Star } from "lucide-react";
import { heroBadges } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const badgeIcons = [LockKeyhole, ShieldCheck, Clock3, BadgeCheck];

const reviews = [
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    treatment: "Cardiac Care Patient",
    quote: "From our first call to post-treatment follow-up, CareRoute made everything clear. We never felt alone."
  },
  {
    name: "James Okafor",
    location: "Lagos, Nigeria",
    treatment: "Orthopaedic Surgery Patient",
    quote: "I was nervous about travelling for surgery. CareRoute handled everything from hospital selection to airport pickup."
  },
  {
    name: "Aisha Al-Rashid",
    location: "Dubai, UAE",
    treatment: "Fertility Patient",
    quote: "They found us the right specialist within days at less than half the cost we were quoted back home."
  },
  {
    name: "David Chen",
    location: "Toronto, Canada",
    treatment: "Cancer Care Family",
    quote: "When my father was diagnosed we did not know where to start. CareRoute gave us a clear path forward with real options."
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    treatment: "Spine Surgery Patient",
    quote: "The hospital CareRoute found had surgeons with 20+ years of experience at a fraction of what we were quoted locally."
  },
  {
    name: "Thomas Bergmann",
    location: "Berlin, Germany",
    treatment: "Dental Implants Patient",
    quote: "CareRoute made what seemed impossible completely affordable. The quality of care was exceptional throughout."
  },
  {
    name: "Fatima Al-Zahrawi",
    location: "Riyadh, Saudi Arabia",
    treatment: "Fertility Treatment",
    quote: "Every detail was handled — visas, accommodation, translator. I could focus purely on my treatment and recovery."
  },
  {
    name: "Robert Nakamura",
    location: "San Francisco, USA",
    treatment: "Joint Replacement Patient",
    quote: "Two weeks after surgery I was walking without pain for the first time in years. CareRoute changed my life."
  }
];

function HalfWheelReviews() {
  const doubled = [...reviews, ...reviews];
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    if (!carousel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let index = 0;
    const interval = window.setInterval(() => {
      const slides = Array.from(carousel.children) as HTMLElement[];
      if (!slides.length) return;

      index = (index + 1) % slides.length;
      carousel.scrollTo({
        left: slides[index].offsetLeft - carousel.offsetLeft,
        behavior: "smooth"
      });
    }, 3800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-2 flex w-full items-center justify-center gap-2 md:mb-0 md:flex-col md:items-center md:justify-start">
        <p className="leading-none text-[0.5rem] font-extrabold uppercase tracking-widest text-brand-coral md:mb-4 md:text-[0.65rem]">
          What our patients say
        </p>
        <div className="flex items-center gap-0.5 leading-none md:mb-5 md:gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="block h-2.5 w-2.5 fill-brand-coral text-brand-coral md:h-4 md:w-4" strokeWidth={0} />
          ))}
        </div>
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="w-full md:hidden">
        <div ref={mobileCarouselRef} className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {reviews.map((review) => (
            <div
              key={review.name}
              className="w-full shrink-0 snap-center rounded-xl border border-brand-border/15 bg-white p-3 shadow-soft"
            >
              <p className="font-serif text-[0.78rem] font-semibold leading-snug text-brand-dark">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-2 flex items-center gap-2 border-t border-brand-border/20 pt-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-coral text-[0.55rem] font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold text-brand-dark">{review.name}</p>
                  <p className="text-[0.56rem] text-brand-dark/55">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: vertical marquee */}
      <div className="hidden relative w-full md:block" style={{ height: 650, overflow: "hidden" }}>
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {doubled.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="min-h-[160px] w-full max-w-96 rounded-2xl border border-brand-border/15 bg-white p-7 shadow-md"
            >
              <p className="font-serif text-base font-semibold leading-snug text-brand-dark">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-3 border-t border-brand-border/20 pt-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral text-xs font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">{review.name}</p>
                  <p className="text-[0.65rem] text-brand-dark/55">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#F5F0E8] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
      </div>

      <p className="mt-2 rounded-lg bg-brand-cream/70 px-2.5 py-1 text-center text-[0.55rem] font-bold text-brand-dark/78 md:mt-5 md:rounded-xl md:px-4 md:py-3 md:text-xs">
        Rated 4.9/5 by patients from over 30 countries
      </p>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  return (
    <section ref={ref} id="top" className="site-grid pt-0 md:pt-14">
      <div aria-hidden="true" className="mb-[14px] md:hidden" style={{ height: "var(--mobile-nav-clearance)" }} />
      <div className="grid items-start gap-6 pb-16 md:gap-8 md:pb-40 lg:grid-cols-12 lg:gap-14">
        <motion.div style={{ opacity: copyOpacity, zIndex: 10 }} className="min-w-0 lg:col-span-7 lg:pt-12">
          <TextReveal
            as="h1"
            text="Your family deserves the right treatment, guided by someone you can trust."
            className="max-w-full font-serif text-[32px] font-semibold leading-[0.98] tracking-normal text-brand-dark [text-wrap:wrap] min-[380px]:text-[34px] md:max-w-4xl md:text-[clamp(2.4rem,7vw,8.4rem)] md:leading-[0.9] md:tracking-[-0.02em] md:[text-wrap:balance]"
          />

          <div className="mt-4 grid w-full max-w-3xl grid-cols-2 gap-2.5 md:mt-6 md:gap-3">
            {heroBadges.map((badge, index) => {
              const Icon = badgeIcons[index];
              return (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.08, duration: 0.55 }}
                  className="flex min-h-[46px] items-center gap-1.5 rounded-lg border border-brand-border bg-white/78 px-2 py-2 shadow-soft backdrop-blur md:min-h-16 md:gap-3 md:rounded-xl md:px-4 md:py-3"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-mint text-brand-dark md:h-9 md:w-9">
                    <Icon className="h-3 w-3 md:h-4 md:w-4" strokeWidth={1.3} />
                  </span>
                  <span className="text-[0.66rem] font-bold leading-tight text-brand-dark/92 md:text-sm">{badge}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center md:mt-10 md:gap-3">
            <MagneticButton href="#assessment" className="min-h-11 w-full sm:w-auto md:min-h-12">Start My Free Assessment</MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="min-w-0 pt-0 md:pt-5 lg:col-span-5"
          style={{ isolation: "isolate", zIndex: 0 }}
        >
          <div className="ml-auto mt-2 md:mt-6" style={{ position: "relative", width: "100%", overflow: "visible" }}>
            <HalfWheelReviews />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
