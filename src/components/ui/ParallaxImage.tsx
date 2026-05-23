"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
};

export function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.6, 
  className 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${(1 - speed) * 100}%`]);
  
  const reducedMotion = useReducedMotion();
  
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: reducedMotion ? 0 : y }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
