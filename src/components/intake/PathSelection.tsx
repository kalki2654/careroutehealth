"use client";

import { motion } from "framer-motion";
import { Building2, Heart } from "lucide-react";

interface PathSelectionProps {
  onSelect: (path: "usa" | "india") => void;
}

export function PathSelection({ onSelect }: PathSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-4xl">
          How can we help you?
        </h2>
        <p className="mt-3 text-base text-brand-dark/70 md:text-lg">
          Choose the path that fits your situation
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* USA Path */}
        <button
          onClick={() => onSelect("usa")}
          className="group relative overflow-hidden rounded-xl border-2 border-brand-border bg-brand-cream p-6 text-left transition-all duration-300 hover:border-brand-coral hover:shadow-soft md:p-8"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-dark text-white transition-transform duration-300 group-hover:scale-110">
            <Building2 className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-brand-dark">
            USA Health Insurance
          </h3>
          <p className="text-sm leading-relaxed text-brand-dark/70">
            Help understanding your insurance, finding care, or handling bills in the U.S.
          </p>
          <div className="mt-4 text-sm font-semibold text-brand-coral">
            Get started →
          </div>
        </button>

        {/* India Path */}
        <button
          onClick={() => onSelect("india")}
          className="group relative overflow-hidden rounded-xl border-2 border-brand-border bg-brand-cream p-6 text-left transition-all duration-300 hover:border-brand-coral hover:shadow-soft md:p-8"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-dark text-white transition-transform duration-300 group-hover:scale-110">
            <Heart className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-brand-dark">
            India Health Access
          </h3>
          <p className="text-sm leading-relaxed text-brand-dark/70">
            Support for your family's healthcare in India from anywhere in the world
          </p>
          <div className="mt-4 text-sm font-semibold text-brand-coral">
            Get started →
          </div>
        </button>
      </div>
    </motion.div>
  );
}
