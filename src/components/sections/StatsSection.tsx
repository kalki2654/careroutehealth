"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/constants";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [count, inView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsSection() {
  return (
    <section className="site-grid -mt-8 pb-10 pt-0 md:-mt-[55px] md:pb-12 md:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center rounded-2xl border border-white/60 bg-brand-dark px-3 py-4 text-center text-white shadow-lift md:rounded-[1.5rem] md:px-8 md:py-8">
              <p className="font-serif text-xl font-semibold leading-none md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[10px] font-semibold leading-tight text-white/68 md:mt-3 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
