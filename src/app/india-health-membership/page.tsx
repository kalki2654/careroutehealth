import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  DollarSign,
  Globe2,
  Hospital,
  LockKeyhole,
  MessageCircle,
  Plane,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  XCircle
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WaitlistForm } from "@/components/membership/WaitlistForm";

export const metadata: Metadata = {
  title: "India Health Access Membership Waitlist | CareRoute Health",
  description:
    "Join the free waitlist for India Health Access Membership, a monthly plan for trusted medical guidance, hospital access, and patient coordination in India.",
  alternates: {
    canonical: "/india-health-membership"
  }
};

const waitlistCount = "0 / 200";

const problems = [
  "NHS waiting lists stretching 12-18 months while you're in pain every day",
  "$45,000 surgery bills in the USA—even with insurance",
  "Your parents need hospital care in India, but you're thousands of miles away and don't know who to trust",
  "No idea which hospital is actually good, which doctor knows what they're doing, or what a fair price should be",
  "Calling hospitals that never call back, getting different prices from different people, never knowing if you're being lied to"
];

const solutionPoints = [
  "A trusted medical guide who knows India's healthcare system inside out",
  "Priority access to pre-vetted, JCI-accredited hospitals across India",
  "Real cost transparency - no inflated quotes, no hidden markups",
  "End-to-end coordination when you need treatment - from first enquiry to 90-day post-treatment follow-up",
  "24/7 WhatsApp support from a team that actually picks up"
];

const benefits = [
  {
    icon: Hospital,
    title: "PRE-VETTED HOSPITALS",
    body: "Access our network of 20+ JCI and NABH-accredited partner hospitals across India - shortlisted for quality, not commission size."
  },
  {
    icon: DollarSign,
    title: "TRANSPARENT PRICING",
    body: "Get real, written cost estimates before you commit to anything. We disclose everything - including what we earn from hospitals."
  },
  {
    icon: ClipboardCheck,
    title: "MEDICAL REPORT REVIEW",
    body: "Share your diagnosis and reports. We review them and tell you honestly whether India is the right option for your case."
  },
  {
    icon: Plane,
    title: "VISA + TRAVEL SUPPORT",
    body: "We guide you through the Indian Medical Visa process, help arrange accommodation near your hospital, and coordinate airport transfers."
  },
  {
    icon: MessageCircle,
    title: "24/7 WHATSAPP SUPPORT",
    body: "Your dedicated case manager is on WhatsApp throughout your entire India stay - from landing to departure."
  },
  {
    icon: RefreshCw,
    title: "POST-TREATMENT FOLLOW-UP",
    body: "We check in at Day 3, Day 14, and Day 30 after you return home. Your recovery matters to us long after the bill is paid."
  }
];

const tiers = [
  {
    name: "ESSENTIAL",
    intro: "For individuals exploring treatment in India",
    highlight: false,
    features: [
      "Priority guidance calls",
      "Monthly India health updates",
      "Free cost guide (updated quarterly)",
      "Discounted coordination fees"
    ]
  },
  {
    name: "PREMIUM",
    intro: "For patients actively planning treatment",
    highlight: true,
    features: [
      "Everything in Essential",
      "Annual Medical Advisor video consultation",
      "1 free medical report review per year",
      "Priority hospital appointment (48-hr guarantee)",
      "Coordination fee completely waived",
      "Dedicated WhatsApp case manager"
    ]
  },
  {
    name: "ELITE FAMILY",
    intro: "For NRI families managing parents' care in India",
    highlight: false,
    features: [
      "Everything in Premium",
      "Covers entire family (up to 4 members)",
      "Quarterly health check coordination in India",
      "Emergency hospital coordination (6-hr response)",
      "24/7 dedicated case manager on call",
      "90-day post-treatment follow-up",
      "Zero extra fees - ever"
    ]
  }
];

const goodFit = [
  "You live in UK, USA, Canada, Australia, or any country with expensive or slow healthcare",
  "You or a family member needs treatment and want honest guidance - not a sales pitch",
  "Your parents are in India and you manage their healthcare from abroad",
  "You want to know the REAL cost of treatment in India before making any decision",
  "You want one trusted person to handle everything - not 10 different agents quoting 10 different prices"
];

const notFor = [
  "You are looking for health insurance that pays your medical bills",
  "You want a one-time consultation only (we still offer that separately)",
  "You are not serious about exploring treatment in India"
];

const foundingBenefits = [
  "Your rate locked in forever - prices will never increase for you, even as we add more services",
  "3 months free when you pay annually (founding members only - not available at launch)",
  "First access to book appointments at our partner hospitals before the general public",
  "Founding Member badge on your account - recognised by all our partner hospitals",
  "Direct access to our founder for your first guidance call"
];

const trustPoints = [
  "We DISCLOSE every rupee we earn from hospitals",
  "We NEVER recommend a hospital based on commission rate - only patient outcomes",
  "We PUBLISH real cost ranges - not inflated estimates designed to upsell you",
  "We STAY with you 30 days after you return home - not just until the bill is paid",
  "We are applying for NABH Medical Value Travel Facilitator accreditation - India's official quality standard for patient facilitators"
];

const faqs = [
  {
    question: "Is this health insurance?",
    answer:
      "No. This is a service membership - not insurance. We coordinate and guide your treatment in India. You pay the hospital directly for your treatment. This membership covers our coordination services only."
  },
  {
    question: "Do I have to travel to India to use it?",
    answer:
      "No. Many members join for peace of mind and use our services once or twice a year. Some join for their parents in India and never travel themselves."
  },
  {
    question: "What countries can join?",
    answer:
      "Any country. We currently focus on patients from UK, USA, Canada, Australia, Nigeria, Kenya, UAE, and other countries with high treatment costs or long waiting times."
  },
  {
    question: "What happens when I actually need treatment?",
    answer:
      "You message your case manager on WhatsApp. We take it from there - hospital shortlisting, cost estimate, appointment booking, visa letter, accommodation, on-ground support, follow-up. All included in your membership."
  },
  {
    question: "How is this different from just contacting a hospital directly?",
    answer:
      "Hospitals have their own sales teams. They quote high, they don't compare options for you, and they disappear after you're discharged. We work for YOU - not the hospital."
  },
  {
    question: "What if I join the waitlist and then change my mind?",
    answer:
      "No problem. The waitlist is 100% free and non-binding. You only pay when we officially launch and you choose to activate a plan."
  },
  {
    question: "Is my medical information safe?",
    answer:
      "Yes. All medical information shared with us is treated as strictly confidential under India's DPDP Act 2023. We never share your data with hospitals without your explicit consent."
  },
  {
    question: "How do I cancel my membership?",
    answer: "Cancel anytime with 30 days notice - no questions asked, no cancellation fees."
  }
];

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-coral md:text-sm">{children}</p>;
}

function SectionHeading({ children }: { children: string }) {
  return <h2 className="font-serif text-[2.35rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(3.2rem,6vw,6.5rem)] md:leading-[0.88]">{children}</h2>;
}

function CTAButton({ children, className = "" }: { children: string; className?: string }) {
  return (
    <a
      href="#waitlist"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 md:min-h-14 md:px-8 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}

export default function IndiaHealthMembershipPage() {
  return (
    <main className="overflow-hidden pb-32 text-brand-dark md:pb-28">
      <section id="top" className="site-grid bg-brand-cream pt-[calc(var(--mobile-nav-clearance,96px)+1rem)] md:pt-36">
        <div className="grid items-center gap-8 pb-12 md:gap-12 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mb-4 inline-flex rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-dark/70">
              Launching Soon
            </p>
            <h1 className="font-serif text-[3rem] font-semibold leading-[0.9] text-brand-dark text-balance md:text-[clamp(4.8rem,9vw,9rem)] md:leading-[0.82]">
              Help your family in India get the care they need.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-dark/72 md:mt-7 md:text-xl md:leading-9">
              A monthly membership that gives you and your family trusted medical guidance, hospital access, and patient coordination in India—so you don't have to figure it out alone.
            </p>
            <p className="mt-4 text-sm font-extrabold text-brand-dark md:text-base">
              Launching soon. Join the free waitlist today.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton className="w-full sm:w-auto">Join the Free Waitlist</CTAButton>
            </div>
            <div className="mt-5 grid gap-2 text-xs font-bold text-brand-dark/74 sm:grid-cols-3 md:mt-7">
              <div className="flex min-h-11 items-center gap-2 rounded-full border border-brand-border bg-white px-4">
                <LockKeyhole className="h-4 w-4 text-brand-coral" strokeWidth={1.5} />
                No payment required
              </div>
              <div className="flex min-h-11 items-center gap-2 rounded-full border border-brand-border bg-white px-4">
                <CheckCircle2 className="h-4 w-4 text-brand-coral" strokeWidth={1.5} />
                Cancel anytime
              </div>
              <div className="flex min-h-11 items-center gap-2 rounded-full border border-brand-border bg-white px-4">
                <Globe2 className="h-4 w-4 text-brand-coral" strokeWidth={1.5} />
                Open to all countries
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[2rem] border border-brand-border bg-white p-3 shadow-lift md:rounded-[2.5rem] md:p-4">
              <Image
                src="/membership-hero.svg"
                alt="Care coordinator guiding an international family through medical care in India"
                width={1440}
                height={1040}
                priority
                className="aspect-[1.18] w-full rounded-[1.5rem] object-cover md:rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-grid bg-white py-12 md:py-20">
        <div>
          <div className="max-w-4xl">
            <SectionLabel>Why This Exists</SectionLabel>
            <SectionHeading>Healthcare shouldn't be this hard to figure out.</SectionHeading>
            <p className="mt-6 text-base leading-7 text-brand-dark/72 md:text-lg md:leading-8">
              If you live in the UK, USA, Canada, or Australia—or if your family is in India while you're abroad—you already know:
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem} className="flex gap-3 rounded-2xl border border-brand-border bg-brand-cream/70 p-4 md:p-5">
                <XCircle className="mt-1 h-5 w-5 shrink-0 text-brand-coral" strokeWidth={1.6} />
                <p className="text-sm font-bold leading-6 text-brand-dark/78 md:text-base md:leading-7">{problem}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-4xl rounded-[1.75rem] bg-brand-dark p-5 text-white md:mt-10 md:p-8">
            <p className="text-base leading-7 text-white/82 md:text-xl md:leading-9">
              You're not alone. Over 700,000 patients every year choose India for treatment—world-class care at 70-90% lower cost than the West.
            </p>
            <p className="mt-4 text-base font-bold leading-7 text-white md:text-xl md:leading-9">
              The problem? Nobody guides you through it properly—before, during, or after. Until now.
            </p>
          </div>
        </div>
      </section>

      <section id="solution" className="site-grid bg-brand-cream py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionLabel>Introducing</SectionLabel>
            <SectionHeading>India Health Access Membership</SectionHeading>
            <p className="mt-5 font-serif text-2xl font-semibold leading-tight text-brand-dark md:text-4xl">
              Your Personal Medical Guidance System - Every Month.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-7 text-brand-dark/74 md:text-lg md:leading-8">
              India Health Access is a monthly membership that gives you and your family:
            </p>
            <div className="mt-6 grid gap-3">
              {solutionPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-brand-border bg-white p-4">
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-brand-coral" strokeWidth={1.5} />
                  <p className="text-sm font-bold leading-6 text-brand-dark/78 md:text-base md:leading-7">{point}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base font-bold leading-7 text-brand-dark md:text-lg md:leading-8">
              Think of it as having a trusted friend who is a medical expert, a travel coordinator, and a patient
              advocate - all in one. For less than the cost of a dinner out each month.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" className="site-grid bg-white py-12 md:py-20">
        <div>
          <div className="max-w-4xl">
            <SectionLabel>Member Benefits</SectionLabel>
            <SectionHeading>Everything You Need. Nothing You Don&apos;t.</SectionHeading>
          </div>
          <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-[1.5rem] border border-brand-border bg-brand-cream/55 p-5 md:p-6">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-brand-dark text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-dark">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-dark/72 md:text-base md:leading-7">{benefit.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-grid bg-brand-dark py-12 text-white md:py-20">
        <div>
          <div className="max-w-4xl">
            <SectionLabel>Membership Plans</SectionLabel>
            <h2 className="font-serif text-[2.35rem] font-semibold leading-[0.95] text-white text-balance md:text-[clamp(3.2rem,6vw,6.5rem)] md:leading-[0.88]">
              3 Plans. One for Every Need. Full Pricing Revealed at Launch.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg md:leading-8">
              Join the waitlist today and lock in your Founding Member rate - up to 40% off regular pricing, guaranteed.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative rounded-[1.75rem] border p-5 md:p-6 ${
                  tier.highlight ? "border-brand-coral bg-white text-brand-dark shadow-lift" : "border-white/15 bg-white/8 text-white"
                }`}
              >
                {tier.highlight ? (
                  <span className="mb-4 inline-flex rounded-full bg-brand-coral px-3 py-1 text-[0.68rem] font-extrabold uppercase text-brand-ink">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="font-serif text-3xl font-semibold">{tier.name}</h3>
                <p className={`mt-2 text-sm font-bold ${tier.highlight ? "text-brand-dark/65" : "text-white/65"}`}>
                  &quot;{tier.intro}&quot;
                </p>
                <div className="mt-6 grid gap-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex gap-2 text-sm font-bold leading-6">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-coral" strokeWidth={1.6} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <p className={`mt-6 text-xs font-extrabold uppercase tracking-[0.12em] ${tier.highlight ? "text-brand-dark/60" : "text-white/55"}`}>
                  Starting from [PRICE REVEALED AT LAUNCH]
                </p>
                <a
                  href="#waitlist"
                  className={`mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 text-sm font-extrabold ${
                    tier.highlight ? "bg-brand-dark text-white" : "bg-white text-brand-dark"
                  }`}
                >
                  Join Waitlist
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-grid bg-brand-cream py-12 md:py-20">
        <div>
          <div className="max-w-4xl">
            <SectionLabel>Is This For You?</SectionLabel>
            <SectionHeading>This Membership Was Built For You If...</SectionHeading>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white p-5 shadow-soft md:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-extrabold uppercase text-brand-dark">
                <CheckCircle2 className="h-5 w-5 text-brand-coral" strokeWidth={1.5} />
                You are a good fit if:
              </h3>
              <div className="grid gap-3">
                {goodFit.map((item) => (
                  <p key={item} className="text-sm font-bold leading-6 text-brand-dark/72 md:text-base md:leading-7">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-brand-border bg-white/60 p-5 md:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-extrabold uppercase text-brand-dark">
                <XCircle className="h-5 w-5 text-brand-coral" strokeWidth={1.5} />
                This is not for you if:
              </h3>
              <div className="grid gap-3">
                {notFor.map((item) => (
                  <p key={item} className="text-sm font-bold leading-6 text-brand-dark/72 md:text-base md:leading-7">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-grid bg-white py-12 md:py-20">
        <div className="rounded-[2rem] bg-brand-dark p-5 text-white md:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionLabel>Limited Offer</SectionLabel>
              <h2 className="font-serif text-[2.35rem] font-semibold leading-[0.95] text-white text-balance md:text-[clamp(3.2rem,6vw,6.5rem)] md:leading-[0.88]">
                Become a Founding Member. Lock In Up to 40% Off - Forever.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/76 md:text-lg md:leading-8">
                We are launching India Health Access Membership to our first 200 founding members only.
              </p>
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/8 p-4">
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-coral">Current Waitlist Count</p>
                <p className="mt-2 font-serif text-4xl font-semibold text-white">{waitlistCount}</p>
              </div>
              <CTAButton className="mt-6 w-full bg-brand-coral text-brand-ink sm:w-auto">
                Reserve My Founding Member Spot - It&apos;s Free
              </CTAButton>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base font-bold leading-7 text-white md:text-xl md:leading-9">As a Founding Member, you get:</p>
              <div className="mt-5 grid gap-3">
                {foundingBenefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl border border-white/12 bg-white/8 p-4">
                    <Sparkles className="mt-1 h-5 w-5 shrink-0 text-brand-coral" strokeWidth={1.5} />
                    <p className="text-sm font-bold leading-6 text-white/82 md:text-base md:leading-7">{benefit}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-bold leading-6 text-white/70 md:text-base md:leading-7">
                This offer expires when we hit 200 waitlist signups or at our official launch date - whichever comes
                first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-grid bg-brand-cream py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionLabel>Why Trust Us</SectionLabel>
            <SectionHeading>Built on Radical Transparency. Not Commission Chasing.</SectionHeading>
            <p className="mt-5 text-base leading-7 text-brand-dark/72 md:text-lg md:leading-8">
              Most medical tourism agents earn hidden commissions from hospitals and never tell you. We do things
              differently:
            </p>
            <div className="mt-6 grid gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand-coral" strokeWidth={1.5} />
                  <p className="text-sm font-bold leading-6 text-brand-dark/76 md:text-base md:leading-7">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-[2rem] bg-brand-dark p-5 text-white shadow-lift md:p-8 lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand-dark">
                  <BrandLogo className="h-14 w-14" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-coral">Founder Note</p>
                  <p className="font-serif text-2xl font-semibold">Vaibhav Patil</p>
                </div>
              </div>
              <p className="text-base leading-7 text-white/82 md:text-lg md:leading-8">
                Hi, I&apos;m Vaibhav Patil - founder of CareRoute Health.
              </p>
              <p className="mt-4 text-base leading-7 text-white/82 md:text-lg md:leading-8">
                I started this because international patients deserve honest guidance - not just another broker chasing
                hospital commissions.
              </p>
              <p className="mt-4 text-base leading-7 text-white/82 md:text-lg md:leading-8">
                I personally oversee every patient case. Our support channels are built around fast, human responses
                from the first guidance request onward.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="site-grid bg-white py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Questions Answered</SectionLabel>
            <SectionHeading>Everything You&apos;re Wondering About</SectionHeading>
          </div>
          <div className="lg:col-span-7">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-brand-border py-4 md:py-5">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-brand-dark md:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-cream text-brand-dark transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-2 pt-2 text-sm leading-7 text-brand-dark/72 md:text-base md:leading-8">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="site-grid scroll-mt-28 bg-brand-dark py-12 text-white md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Join the Waitlist</SectionLabel>
            <h2 className="font-serif text-[2.35rem] font-semibold leading-[0.95] text-white text-balance md:text-[clamp(3.2rem,6vw,6.5rem)] md:leading-[0.88]">
              Reserve Your Founding Member Spot. 100% Free. No Payment Required.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/74 md:text-lg md:leading-8">
              200 spots only. {waitlistCount} spots already reserved.
            </p>
            <div className="mt-6 grid gap-3">
              {["No payment required", "No spam or hidden obligation", "Founding member access at launch"].map((item) => (
                <div key={item} className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 text-sm font-bold text-white/82">
                  <BadgeCheck className="h-5 w-5 text-brand-coral" strokeWidth={1.5} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="site-grid bg-[#071d1b] py-10 text-white/84 md:py-14">
        <div>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Link href="#top" className="flex items-center gap-3">
                <BrandLogo variant="light" className="h-11 w-11" />
                <span>
                  <span className="block font-serif text-2xl font-semibold leading-none text-white">CareRoute Health</span>
                  <span className="mt-2 block text-sm">Trusted Medical Guidance for International Patients</span>
                </span>
              </Link>
              <p className="mt-6 text-xs leading-6 md:text-sm md:leading-7">
                CareRoute Health is a patient facilitation service, not a medical provider or insurance company. We do
                not cover the cost of medical treatment. All treatment costs are paid directly to partner hospitals by
                the patient. Medical decisions should always be made in consultation with qualified healthcare
                professionals.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
              <div>
                <h3 className="mb-4 text-sm font-extrabold uppercase text-white">Links</h3>
                <div className="grid gap-2 text-sm">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <Link href="#solution" className="hover:text-white">How It Works</Link>
                  <Link href="#waitlist" className="hover:text-white">Membership Waitlist</Link>
                  <Link href="#waitlist" className="hover:text-white">Contact Us</Link>
                  <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-extrabold uppercase text-white">Contact</h3>
                <div className="grid gap-2 text-sm">
                  <a href="mailto:hello@careroute.health" className="hover:text-white">hello@careroute.health</a>
                  <span>careroute.health</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5 text-xs md:mt-12 md:text-sm">
            Copyright 2026 CareRoute Health. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
