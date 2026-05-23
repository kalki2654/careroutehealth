"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type CountUpAnimationProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function CountUpAnimation({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className
}: CountUpAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1]
    });
    
    return controls.stop;
  }, [count, inView, value, duration]);

  return (
    <motion.span ref={ref} className={cn(className)}>
      {rounded}
    </motion.span>
  );
}
