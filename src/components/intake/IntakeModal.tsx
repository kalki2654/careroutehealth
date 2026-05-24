"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PathSelection } from "./PathSelection";
import { USAIntakeForm } from "./USAIntakeForm";
import { IndiaIntakeForm } from "./IndiaIntakeForm";
import { ConfirmationScreen } from "./ConfirmationScreen";

type IntakeStep = "path" | "usa-form" | "india-form" | "confirmation";
type PathType = "usa" | "india" | null;

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPath?: PathType;
}

export function IntakeModal({ isOpen, onClose, initialPath = null }: IntakeModalProps) {
  const [step, setStep] = useState<IntakeStep>(initialPath ? `${initialPath}-form` as IntakeStep : "path");
  const [selectedPath, setSelectedPath] = useState<PathType>(initialPath);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialPath) {
      setSelectedPath(initialPath);
      setStep(`${initialPath}-form` as IntakeStep);
    } else if (isOpen) {
      setStep("path");
      setSelectedPath(null);
    }
  }, [isOpen, initialPath]);

  const handlePathSelect = (path: "usa" | "india") => {
    setSelectedPath(path);
    setStep(`${path}-form` as IntakeStep);
  };

  const handleFormSubmit = () => {
    setStep("confirmation");
  };

  const handleClose = () => {
    onClose();
    // Reset after animation completes
    setTimeout(() => {
      setStep(initialPath ? `${initialPath}-form` as IntakeStep : "path");
      setSelectedPath(initialPath);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-dark/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl my-8 bg-white rounded-2xl shadow-lift pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="sticky right-4 top-4 z-10 ml-auto mr-4 mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-cream text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              {/* Content */}
              <div className="px-6 pb-6 md:px-10 md:pb-10">
                <AnimatePresence mode="wait">
                  {step === "path" && (
                    <PathSelection key="path" onSelect={handlePathSelect} />
                  )}
                  {step === "usa-form" && (
                    <USAIntakeForm key="usa-form" onSubmit={handleFormSubmit} onBack={() => setStep("path")} />
                  )}
                  {step === "india-form" && (
                    <IndiaIntakeForm key="india-form" onSubmit={handleFormSubmit} onBack={() => setStep("path")} />
                  )}
                  {step === "confirmation" && (
                    <ConfirmationScreen key="confirmation" path={selectedPath} onClose={handleClose} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
