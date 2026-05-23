"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollProgressProps = {
  color?: string;
  height?: string;
};

export function ScrollProgress({ color = "bg-brand-coral", height = "h-1" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={cn("fixed left-0 top-0 z-50 w-full origin-left", height, color)}
      style={{ scaleX }}
    />
  );
}
