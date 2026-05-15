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

  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step, totalSteps]);

  const update = <Key extends keyof QuizData>(key: Key, value: QuizData[Key]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const next = () => setStep((current) => Math.min(totalSteps - 1, current + 1));
  const previous = () => setStep((current) => Math.max(0, current - 1));

  return {
    data,
    next,
    previous,
    progress,
    setSubmitted,
    step,
    submitted,
    update
  };
}
