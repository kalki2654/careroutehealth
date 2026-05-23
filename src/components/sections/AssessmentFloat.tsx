"use client";

import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AssessmentFloat() {
  const pathname = usePathname();
  const isMembershipPage = pathname === "/india-health-membership" || pathname === "/membership";

  if (isMembershipPage) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-border bg-white/95 shadow-lift backdrop-blur-lg">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-center text-xs font-extrabold text-brand-dark md:text-left md:text-sm">
            India Health Access Membership - Launching Soon
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="#waitlist"
              className="flex-1 rounded-full bg-brand-dark px-4 py-3 text-center text-xs font-bold text-white md:flex-none md:px-6 md:text-sm"
            >
              Join Free Waitlist
            </Link>
            <span className="shrink-0 rounded-full border border-brand-border bg-brand-cream px-3 py-2 text-[0.68rem] font-extrabold text-brand-dark md:text-xs">
              0 / 200 spots taken
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/#assessment"
        aria-label="Start Free Assessment"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-brand-coral text-brand-ink shadow-lift md:grid"
      >
        <ClipboardList className="h-6 w-6" strokeWidth={1.6} />
        <span className="pointer-events-none absolute right-16 w-max max-w-56 translate-x-2 rounded-xl bg-brand-dark px-3 py-2 text-xs font-bold text-white opacity-0 shadow-soft transition-all group-hover:translate-x-0 group-hover:opacity-100">
          Start Free Assessment
        </span>
      </Link>
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-brand-border bg-white/95 backdrop-blur-lg shadow-lg md:hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <Link
            href="/#assessment"
            className="flex-1 rounded-full bg-brand-dark px-4 py-3 text-center text-xs font-bold text-white"
          >
            Start Free Assessment
          </Link>
        </div>
      </div>
    </>
  );
}
