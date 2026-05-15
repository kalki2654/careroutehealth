"use client";

import { useMemo, useState } from "react";

export type QuizData = {
  treatment: string;
  country: string;
  readiness: string;
  funding: string;
  name: string;
  phone: string;
  email: string;
  contactTime: string;
};

const initialData: QuizData = {
  treatment: "",
  country: "",
  readiness: "",
  funding: "",
  name: "",
  phone: "",
  email: "",
  contactTime: "Anytime"
};

export function useQuizForm(totalSteps: number) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step, totalSteps]);

  const update = <Key extends keyof QuizData>(key: Key, value: QuizData[Key]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const next = () => setStep((current) => Math.min(totalSteps - 1, current + 1));
  const previous = () => setStep((current) => Math.max(0, current - 1));
  const handleSubmit = async (formData: QuizData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setSubmitStatus("error");
        setSubmitMessage(result.message || "Something went wrong. Please try again.");
        return false;
      }

      setSubmitStatus("success");
      setSubmitted(true);
      return true;
    } catch (error) {
      console.error("Lead submission failed:", error);
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    handleSubmit,
    isSubmitting,
    next,
    previous,
    progress,
    setSubmitted,
    step,
    submitted,
    submitMessage,
    submitStatus,
    update
  };
}
