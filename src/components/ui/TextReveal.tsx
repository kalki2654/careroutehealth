"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  once?: boolean;
};

export function TextReveal({ text, as: Tag = "h2", className, once = true }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="inline">
          <motion.span
            className="mr-[0.25em] inline-block"
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
          <wbr />
        </span>
      ))}
    </Tag>
  );
}
