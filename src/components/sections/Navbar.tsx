"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHomePage = pathname === "/";
  const isMembershipPage = pathname === "/india-health-membership" || pathname === "/membership";
  const isUSAPage = pathname === "/usa-health-insurance";
  
  const links = isMembershipPage
    ? [
        { href: "/", label: "Home" },
        { href: "#solution", label: "How It Works" },
        { href: "#waitlist", label: "Contact" }
      ]
    : isUSAPage
    ? [
        { href: "/", label: "Home" },
        { href: "/india-health-membership", label: "India Membership" },
        { href: "/#how-it-works", label: "How It Works" },
        { href: "/#faq", label: "FAQ" }
      ]
    : navLinks;
    
  const homeHref = isHomePage ? "#top" : "/";
  const ctaHref = isMembershipPage ? "#waitlist" : isUSAPage ? "#contact" : "/#pathways";
  const ctaLabel = isMembershipPage ? "Join the Waitlist" : isUSAPage ? "Get Started" : "Get Started";

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateMobileClearance = () => {
      const { bottom } = header.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(header);
      const breathingRoom = Number.parseFloat(computedStyle.paddingTop) || 0;
      document.documentElement.style.setProperty("--mobile-nav-clearance", `${Math.ceil(bottom + breathingRoom)}px`);
    };

    updateMobileClearance();
    const resizeObserver = new ResizeObserver(updateMobileClearance);
    resizeObserver.observe(header);
    window.addEventListener("resize", updateMobileClearance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMobileClearance);
    };
  }, [open, scrolled]);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        "fixed left-1/2 top-4 z-50 w-[min(1440px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-brand-border bg-brand-cream px-4 backdrop-blur-xl transition-all duration-300 md:rounded-full md:bg-brand-cream/78 md:px-5",
        scrolled ? "py-2 shadow-soft" : "py-3"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href={homeHref} className="flex min-w-0 items-center gap-3" aria-label="CareRoute Health home">
          <BrandLogo className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-serif text-xl font-bold text-brand-dark">CareRoute</span>
            <span className="hidden text-[0.72rem] font-semibold text-brand-muted sm:block">
              {isMembershipPage ? "India Health Access" : isUSAPage ? "USA Health Insurance" : "Healthcare Navigation"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-brand-dark/85 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-brand-dark">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton href={ctaHref} variant={isMembershipPage ? "coral" : "dark"} className="hidden min-h-10 px-5 md:inline-flex">
            {ctaLabel}
          </MagneticButton>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white/70 text-brand-dark lg:hidden"
            aria-label="Open navigation"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="grid gap-1 px-2 pb-2 pt-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-3 text-sm font-bold text-brand-dark/85 hover:bg-white/70"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-dark px-4 py-3 text-center text-sm font-bold text-white"
              >
                {ctaLabel}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
