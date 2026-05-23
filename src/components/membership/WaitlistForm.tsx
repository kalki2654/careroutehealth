"use client";

import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type WaitlistFormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  persona: string;
  tierInterest: string;
  notes: string;
  consent: boolean;
};

const initialData: WaitlistFormData = {
  fullName: "",
  email: "",
  whatsapp: "",
  country: "",
  persona: "",
  tierInterest: "",
  notes: "",
  consent: false
};

const countries = ["UK", "USA", "Canada", "Australia", "Nigeria", "Kenya", "UAE", "India", "Other"];

const personas = [
  "I personally need treatment in India",
  "My parents/family in India need medical support",
  "I'm exploring options for future treatment",
  "I'm an NRI managing family healthcare in India",
  "Other"
];

const tiers = ["Essential", "Premium", "Elite Family", "Not sure yet"];

const inputClass =
  "h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-sm font-semibold text-brand-dark outline-none transition focus:border-brand-coral md:h-14";

const labelClass = "grid gap-2 text-sm font-extrabold text-brand-dark/72";

export function WaitlistForm() {
  const [data, setData] = useState<WaitlistFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const firstName = data.fullName.trim().split(/\s+/)[0] || "there";
  const canSubmit = useMemo(
    () =>
      Boolean(
        data.fullName.trim() &&
          data.email.trim() &&
          data.whatsapp.trim() &&
          data.country &&
          data.persona &&
          data.consent
      ),
    [data]
  );

  const update = <Key extends keyof WaitlistFormData>(key: Key, value: WaitlistFormData[Key]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setError(result.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (submissionError) {
      console.error("Waitlist submission failed:", submissionError);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[1.75rem] bg-brand-cream p-5 text-brand-dark shadow-lift md:p-8">
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-brand-dark text-white">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-3xl font-semibold leading-none md:text-5xl">Thank you, {firstName}.</h3>
        <p className="mt-4 text-sm leading-6 text-brand-dark/75 md:text-base md:leading-7">
          Your founding member spot request has been received. We will send membership launch updates by WhatsApp and
          email, and you are not committing to purchase anything.
        </p>
        <div className="mt-6 rounded-2xl border border-brand-border bg-white p-4 text-sm font-bold leading-6 text-brand-dark/75">
          0 / 200 spots taken
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[1.75rem] bg-brand-cream p-5 text-brand-dark shadow-lift md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Full Name *
          <input
            className={inputClass}
            value={data.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className={labelClass}>
          Email Address *
          <input
            className={inputClass}
            value={data.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            type="email"
            required
          />
        </label>
        <label className={labelClass}>
          WhatsApp Number (with country code) *
          <input
            className={inputClass}
            value={data.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            autoComplete="tel"
            type="tel"
            required
          />
        </label>
        <label className={labelClass}>
          Which country are you in? *
          <select
            className={inputClass}
            value={data.country}
            onChange={(event) => update("country", event.target.value)}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          What best describes you? *
          <select
            className={inputClass}
            value={data.persona}
            onChange={(event) => update("persona", event.target.value)}
            required
          >
            <option value="">Select one</option>
            {personas.map((persona) => (
              <option key={persona} value={persona}>
                {persona}
              </option>
            ))}
          </select>
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Which membership tier interests you most?
          <select
            className={inputClass}
            value={data.tierInterest}
            onChange={(event) => update("tierInterest", event.target.value)}
          >
            <option value="">Select one</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Anything specific you want from this membership?
          <textarea
            className="min-h-28 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-semibold text-brand-dark outline-none transition focus:border-brand-coral"
            value={data.notes}
            onChange={(event) => update("notes", event.target.value)}
          />
        </label>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-border bg-white p-4 text-xs font-bold leading-5 text-brand-dark/72 md:text-sm md:leading-6">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(event) => update("consent", event.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-brand-dark"
        />
        <span>
          I agree to receive updates about the India Health Access Membership launch via WhatsApp and email. (We never
          spam. Unsubscribe anytime.)
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-5 text-sm font-extrabold text-white transition disabled:cursor-not-allowed disabled:opacity-40 md:min-h-14"
      >
        {isSubmitting ? "Reserving..." : "Reserve My Spot Now - It's Free"}
        {!isSubmitting ? <ArrowRight className="h-4 w-4" strokeWidth={1.5} /> : null}
      </button>

      {error ? (
        <p className="mt-4 rounded-xl border border-brand-coral/30 bg-white px-4 py-3 text-xs font-bold leading-5 text-brand-dark md:text-sm">
          {error}
        </p>
      ) : null}

      <p className="mt-5 flex items-start gap-2 text-xs font-bold leading-5 text-brand-dark/62 md:text-sm md:leading-6">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-brand-coral" strokeWidth={1.5} />
        Your information is 100% secure and confidential. We will never sell or share your data. By joining the
        waitlist you are not committing to purchase anything.
      </p>
    </form>
  );
}
