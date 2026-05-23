"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StaggeredListProps = {
  children: ReactNode[];
  staggerDelay?: number;
  maxDelay?: number;
  className?: string;
};

export function StaggeredList({
  children,
  staggerDelay = 0.08,
  maxDelay = 0.8,
  className
}: StaggeredListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          transition={{
            delay: Math.min(index * staggerDelay, maxDelay)
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
