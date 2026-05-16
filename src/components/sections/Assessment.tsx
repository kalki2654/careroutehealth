"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, LockKeyhole } from "lucide-react";
import { FormEvent } from "react";
import { contactMethodOptions, countries, fundingOptions, readinessOptions, treatmentOptions } from "@/lib/constants";
import { useQuizForm } from "@/hooks/useQuizForm";
import { cn } from "@/lib/utils";

const stepTitles = [
  "What type of treatment are you exploring?",
  "Which country will you be travelling from?",
  "Do you have existing medical reports or a diagnosis?",
  "How will you be funding your treatment?",
  "Contact details"
];

function OptionButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-12 w-full cursor-pointer rounded-full border px-4 py-3 text-sm transition-all",
        active
          ? "border-[#014E4E] bg-[#014E4E] text-white"
          : "border-[#014E4E]/40 bg-white text-brand-dark/72 hover:bg-[#014E4E] hover:text-white"
      )}
    >
      <span className="flex items-center justify-between gap-3 text-left">
        <span>{children}</span>
        {active ? <Check className="h-4 w-4 shrink-0" strokeWidth={1.5} /> : null}
      </span>
    </button>
  );
}

export function Assessment() {
  const quiz = useQuizForm(5);
  const firstName = quiz.data.name.trim().split(/\s+/)[0] || "there";
  const prefersEmail = quiz.data.contactMethod === "Email";
  const contactMethodLabel = prefersEmail ? "email" : "WhatsApp";

  const canContinue = Boolean(
    (quiz.step === 0 && quiz.data.treatment) ||
    (quiz.step === 1 && quiz.data.country) ||
    (quiz.step === 2 && quiz.data.readiness) ||
    (quiz.step === 3 && quiz.data.funding) ||
    (quiz.step === 4 &&
      quiz.data.name.trim() &&
      quiz.data.phone.trim() &&
      quiz.data.contactMethod &&
      (!prefersEmail || quiz.data.email.trim()))
  );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    await quiz.handleSubmit(quiz.data);
  };

  return (
    <section id="assessment" className="site-grid scroll-mt-24 bg-brand-dark py-10 text-white md:scroll-mt-28 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">Free Assessment</p>
            <h2 className="font-serif text-[2.1rem] font-semibold leading-[0.95] text-balance md:text-[clamp(2.8rem,5vw,6rem)] md:leading-[0.88]">
              Let us understand your needs in 5 short questions.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/80 md:mt-7 md:text-lg md:leading-8">
              No commitment. No payment. Just a clear starting point so we can send the right guidance within 24 hours.
            </p>
            <div className="mt-4 grid gap-2 md:mt-10 md:gap-3">
              {["Encrypted and confidential", "No pressure, no sales pitch", "Personalised hospital and cost guidance"].map((item) => (
                <div key={item} className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-4 text-xs font-bold text-white/82 md:min-h-14 md:gap-3 md:rounded-full md:px-5 md:text-sm">
                  <LockKeyhole className="h-4 w-4 text-brand-coral" strokeWidth={1.25} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="relative overflow-hidden rounded-[1.5rem] bg-brand-cream p-4 text-brand-dark shadow-lift md:rounded-[2rem] md:p-8 lg:col-span-7">
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-brand-dark/10 md:mb-8">
            <motion.div
              className="h-full rounded-full bg-brand-coral"
              animate={{ width: `${quiz.progress}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!quiz.submitted ? (
              <motion.div
                key={quiz.step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.32 }}
                className="min-h-[220px] md:min-h-[380px]"
              >
                <p className="mb-2 text-xs font-extrabold uppercase text-brand-coral md:mb-3 md:text-sm">Step {quiz.step + 1} of 5</p>
                <h3 className="max-w-2xl font-serif text-[1.65rem] font-semibold leading-tight md:text-5xl md:leading-[0.98]">
                  {stepTitles[quiz.step]}
                </h3>

                {quiz.step === 0 ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2 md:mt-8 md:gap-3">
                    {treatmentOptions.map((option) => (
                      <OptionButton
                        key={option}
                        active={quiz.data.treatment === option}
                        onClick={() => quiz.update("treatment", option)}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </div>
                ) : null}

                {quiz.step === 1 ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2 md:mt-8 md:gap-3">
                    {countries.map((country) => (
                      <OptionButton
                        key={country}
                        active={quiz.data.country === country}
                        onClick={() => quiz.update("country", country)}
                      >
                        {country}
                      </OptionButton>
                    ))}
                  </div>
                ) : null}

                {quiz.step === 2 ? (
                  <div className="mt-5 grid gap-2 md:mt-8 md:gap-3">
                    {readinessOptions.map((option) => (
                      <OptionButton
                        key={option}
                        active={quiz.data.readiness === option}
                        onClick={() => quiz.update("readiness", option)}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </div>
                ) : null}

                {quiz.step === 3 ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2 md:mt-8 md:gap-3">
                    {fundingOptions.map((option) => (
                      <OptionButton
                        key={option}
                        active={quiz.data.funding === option}
                        onClick={() => quiz.update("funding", option)}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </div>
                ) : null}

                {quiz.step === 4 ? (
                  <div className="mt-5 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4">
                    <label className="grid gap-1.5 text-sm font-bold text-brand-dark/68 md:gap-2">
                      Full name
                      <input
                        value={quiz.data.name}
                        onChange={(event) => quiz.update("name", event.target.value)}
                        required
                        autoComplete="name"
                        className="h-12 rounded-xl border border-brand-border bg-white px-4 text-base text-brand-dark outline-none focus:border-brand-coral md:h-[3.25rem]"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-bold text-brand-dark/68 md:gap-2">
                      WhatsApp number
                      <input
                        value={quiz.data.phone}
                        onChange={(event) => quiz.update("phone", event.target.value)}
                        required
                        autoComplete="tel"
                        type="tel"
                        className="h-12 rounded-xl border border-brand-border bg-white px-4 text-base text-brand-dark outline-none focus:border-brand-coral md:h-[3.25rem]"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-bold text-brand-dark/68 md:gap-2">
                      Email address
                      <input
                        value={quiz.data.email}
                        onChange={(event) => quiz.update("email", event.target.value)}
                        autoComplete="email"
                        type="email"
                        required={prefersEmail}
                        className="h-12 rounded-xl border border-brand-border bg-white px-4 text-base text-brand-dark outline-none focus:border-brand-coral md:h-[3.25rem]"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-bold text-brand-dark/68 md:gap-2">
                      Preferred contact time
                      <select
                        value={quiz.data.contactTime}
                        onChange={(event) => quiz.update("contactTime", event.target.value)}
                        className="h-12 rounded-xl border border-brand-border bg-white px-4 text-base text-brand-dark outline-none focus:border-brand-coral md:h-[3.25rem]"
                      >
                        <option>Anytime</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </label>
                    <div className="grid gap-2 text-sm font-bold text-brand-dark/68 md:col-span-2">
                      Preferred contact method
                      <div className="grid gap-2 sm:grid-cols-2">
                        {contactMethodOptions.map((option) => (
                          <OptionButton
                            key={option}
                            active={quiz.data.contactMethod === option}
                            onClick={() => quiz.update("contactMethod", option)}
                          >
                            {option}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid min-h-[230px] content-center md:min-h-[380px]"
              >
                <div className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-brand-dark text-white md:h-14 md:w-14">
                  <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl font-semibold leading-none md:text-6xl">Thank you, {firstName}.</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-brand-dark/80 md:mt-6 md:text-lg md:leading-8">
                  We have received your assessment and will contact you by {contactMethodLabel} within 24 hours with personalised
                  guidance.
                </p>
                <ol className="mt-5 grid gap-2 text-sm font-bold text-brand-dark/85 md:mt-8 md:gap-3">
                  <li>1. Our team reviews your assessment.</li>
                  <li>2. We prepare 2-3 hospital and doctor options matched to your needs.</li>
                  <li>3. We contact you with a clear cost overview and next steps.</li>
                </ol>
              </motion.div>
            )}
          </AnimatePresence>

          {!quiz.submitted ? (
            <>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-brand-border pt-4 sm:gap-3 md:mt-8 md:pt-6">
                <button
                  type="button"
                  onClick={quiz.previous}
                  disabled={quiz.step === 0}
                  className="inline-flex min-h-12 min-w-0 flex-[0.9] items-center justify-center gap-1.5 rounded-full border border-brand-border bg-white px-3 text-xs font-bold text-brand-dark disabled:cursor-not-allowed disabled:opacity-35 min-[360px]:gap-2 min-[360px]:text-sm sm:flex-none sm:px-5"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  Back
                </button>
                {quiz.step < 4 ? (
                  <button
                    type="button"
                    onClick={quiz.next}
                    disabled={!canContinue}
                    className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-dark px-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-35 min-[360px]:gap-2 min-[360px]:text-sm sm:flex-none sm:px-6"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canContinue || quiz.isSubmitting}
                    className="inline-flex min-h-12 min-w-0 flex-[1.45] items-center justify-center rounded-full bg-brand-dark px-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-35 min-[360px]:text-sm sm:flex-none sm:px-6"
                  >
                    {quiz.isSubmitting ? "Sending..." : "Send My Assessment"}
                  </button>
                )}
              </div>
              {quiz.submitStatus === "error" ? (
                <p className="mt-3 rounded-xl border border-brand-coral/30 bg-white px-4 py-3 text-xs font-bold leading-5 text-brand-dark md:text-sm">
                  {quiz.submitMessage || "Something went wrong. Please try again."}
                </p>
              ) : null}
              <p className="mt-4 text-xs leading-5 text-brand-dark/65 md:mt-5 md:text-sm md:leading-6">
                Your information is encrypted and confidential. We will respond within 24 hours with personalised
                guidance, no pressure and no sales pitch.
              </p>
            </>
          ) : null}
        </form>
      </div>
      </motion.div>
    </section>
  );
}
