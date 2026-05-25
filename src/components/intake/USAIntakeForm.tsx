"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, AlertCircle } from "lucide-react";

interface USAIntakeFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function USAIntakeForm({ onSubmit, onBack }: USAIntakeFormProps) {
  const [formData, setFormData] = useState({
    helpWith: [] as string[],
    timing: "",
    insuranceProvider: "",
    name: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("Form submission is not configured. Please contact support.");
      }

      // Map form data to Google Sheets format
      const submissionData = {
        path: "USA",
        helpType: formData.helpWith.join(", "),
        timing: formData.timing,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: "",
        familyCityIndia: "",
        insuranceProvider: formData.insuranceProvider,
        notes: `Help with: ${formData.helpWith.join(", ")}, Timing: ${formData.timing}`
      };

      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData)
      });

      // Note: With no-cors mode, we can't read the response
      // We assume success if no error is thrown
      setIsSubmitting(false);
      onSubmit();
      
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong while sending your request. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isValid = formData.helpWith.length > 0 && formData.timing && formData.insuranceProvider && formData.name && formData.email && formData.phone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand-dark/60 transition-colors hover:text-brand-dark"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back
      </button>

      <div className="mb-8">
        <h2 className="font-serif text-3xl font-semibold text-brand-dark md:text-4xl">
          USA Health Insurance Help
        </h2>
        <p className="mt-3 text-base text-brand-dark/70">
          Tell us a bit about your situation so we can help you better
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* What do you need help with? */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            What do you need help with? (Select all that apply)
          </label>
          <div className="space-y-2">
            {[
              { value: "understanding-insurance", label: "Understanding my insurance coverage" },
              { value: "where-to-go", label: "Deciding where to go for care" },
              { value: "cost-estimate", label: "Estimating likely costs" },
              { value: "medical-bill", label: "Reviewing a medical bill" },
              { value: "other", label: "Something else" }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                  formData.helpWith.includes(option.value)
                    ? "border-brand-coral bg-brand-coral/5"
                    : "border-brand-border bg-white hover:border-brand-dark/20"
                }`}
              >
                <input
                  type="checkbox"
                  name="helpWith"
                  value={option.value}
                  checked={formData.helpWith.includes(option.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      helpWith: e.target.checked
                        ? [...formData.helpWith, value]
                        : formData.helpWith.filter((v) => v !== value)
                    });
                  }}
                  className="h-4 w-4 rounded text-brand-coral focus:ring-brand-coral"
                />
                <span className="text-sm font-medium text-brand-dark">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Timing */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Is this before care or after receiving a bill?
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: "before", label: "Before care" },
              { value: "after", label: "After receiving a bill" }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                  formData.timing === option.value
                    ? "border-brand-coral bg-brand-coral/5"
                    : "border-brand-border bg-white hover:border-brand-dark/20"
                }`}
              >
                <input
                  type="radio"
                  name="timing"
                  value={option.value}
                  checked={formData.timing === option.value}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="h-4 w-4 text-brand-coral focus:ring-brand-coral"
                />
                <span className="text-sm font-medium text-brand-dark">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Insurance Provider */}
        <div>
          <label htmlFor="insurance" className="mb-2 block text-sm font-semibold text-brand-dark">
            Insurance provider
          </label>
          <input
            type="text"
            id="insurance"
            required
            value={formData.insuranceProvider}
            onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
            placeholder="e.g., Blue Cross, Aetna, UnitedHealthcare"
            className="w-full rounded-lg border-2 border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/20"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-brand-dark">
            Your name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="First and last name"
            className="w-full rounded-lg border-2 border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/20"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-dark">
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full rounded-lg border-2 border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-brand-dark">
            Phone or WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-lg border-2 border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full rounded-full bg-brand-coral px-8 py-4 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:translate-y-0 disabled:opacity-50 disabled:shadow-soft"
        >
          {isSubmitting ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </motion.div>
  );
}
