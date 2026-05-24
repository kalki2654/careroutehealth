"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ConfirmationScreenProps {
  path: "usa" | "india" | null;
  onClose: () => void;
}

export function ConfirmationScreen({ path, onClose }: ConfirmationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="py-8 text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-mint"
      >
        <CheckCircle2 className="h-10 w-10 text-brand-dark" strokeWidth={1.5} />
      </motion.div>

      {/* Heading */}
      <h2 className="mb-4 font-serif text-3xl font-semibold text-brand-dark md:text-4xl">
        We've received your request
      </h2>

      {/* Message */}
      <div className="mx-auto max-w-md space-y-4 text-base leading-relaxed text-brand-dark/70">
        <p>
          A CareRoute team member will review your details and reach out with the next steps.
        </p>
        <p>
          We typically respond within 24 hours on business days.
        </p>
      </div>

      {/* Emergency Disclaimer */}
      <div className="mx-auto mt-8 max-w-md rounded-xl border-2 border-brand-coral/20 bg-brand-coral/5 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-coral" strokeWidth={1.5} />
          <div className="text-left text-sm leading-relaxed text-brand-dark/80">
            <p className="font-semibold text-brand-dark">Medical emergency?</p>
            <p className="mt-1">
              If this is a medical emergency, contact local emergency services immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="mt-8 rounded-full bg-brand-dark px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-soft"
      >
        Close
      </button>
    </motion.div>
  );
}
