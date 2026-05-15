import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";

type LegalSection = {
  title: string;
  body?: string[];
  items?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <main id="top" className="bg-brand-cream pt-[calc(var(--mobile-nav-clearance)+1.5rem)] md:pt-36">
      <section className="site-grid pb-12 md:pb-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">{eyebrow}</p>
          <h1 className="font-serif text-[2.45rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(3.5rem,7vw,7.2rem)] md:leading-[0.88]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-brand-dark/78 md:mt-7 md:text-lg md:leading-8">
            {intro}
          </p>
          <p className="mt-4 text-sm font-bold text-brand-dark/55">Last updated: {lastUpdated}</p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-brand-border bg-white/74 p-5 shadow-soft md:p-8">
              <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-dark md:text-4xl">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-sm leading-7 text-brand-dark/76 md:text-base md:leading-8">
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-brand-dark/76 md:text-base md:leading-8">
                  {section.items.map((item) => (
                    <li key={item} className="rounded-xl bg-brand-cream/70 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-brand-dark p-5 text-white shadow-lift md:mt-12 md:p-8">
          <p className="font-serif text-2xl font-semibold md:text-4xl">Need help with your information?</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 md:text-base md:leading-8">
            Contact CareRoute Health at{" "}
            <a href="mailto:hello@careroute.health" className="font-bold text-white underline decoration-brand-coral/70 underline-offset-4">
              hello@careroute.health
            </a>
            . We will review your request and respond as soon as reasonably possible.
          </p>
          <Link
            href="/#assessment"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-coral px-6 text-sm font-bold text-brand-ink sm:w-auto"
          >
            Start Free Assessment
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
