import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

const supportLinks = [
  { label: "USA Health Insurance Navigation", href: "/#usa-support" },
  { label: "India Health Access Membership", href: "/#india-membership" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" }
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" }
];

const trustPoints = [
  "Clear guidance before you book care",
  "Cost transparency before and after treatment",
  "Support for U.S. and India healthcare decisions",
  "Private, family-first navigation"
];

export function SiteFooter() {
  return (
    <footer className="site-grid bg-[#071d1b] pb-24 pt-10 text-white/85 md:py-14">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
        {/* Column 1: Brand and Description */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Link href="/#top" className="flex items-center gap-3" aria-label="CareRoute Health home">
            <BrandLogo variant="light" className="h-10 w-10 md:h-11 md:w-11" />
            <span>
              <span className="block font-serif text-xl font-semibold leading-none text-white md:text-2xl">CareRoute</span>
              <span className="mt-1 block text-xs md:mt-2 md:text-sm">Healthcare navigation for expats and families</span>
            </span>
          </Link>
          <p className="mt-5 text-xs leading-6 md:mt-8 md:text-sm md:leading-7">
            CareRoute helps you navigate healthcare decisions in the U.S. and coordinate family healthcare support in India. 
            We provide guidance and support—not medical treatment.
          </p>
        </div>

        {/* Column 2: Support Links */}
        <div>
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Support</h3>
          <div className="grid gap-1.5 text-xs md:gap-3 md:text-sm">
            {supportLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Company Links */}
        <div>
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Company</h3>
          <div className="grid gap-1.5 text-xs md:gap-3 md:text-sm">
            {companyLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4: Trust & Reassurance */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Why CareRoute</h3>
          <div className="grid gap-2 text-xs md:gap-3 md:text-sm">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-2">
                <span className="mt-1 text-[#4ecdc4]">✓</span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs md:mt-12 md:flex-row md:gap-4 md:pt-8 md:text-sm">
        <span className="flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
          <span>/</span>
          <Link href="/medical-disclaimer" className="transition-colors hover:text-white">Medical Disclaimer</Link>
          <span>/</span>
          <Link href="/terms-of-service" className="transition-colors hover:text-white">Terms of Service</Link>
        </span>
        <span>© 2026 CareRoute. All rights reserved.</span>
      </div>
    </footer>
  );
}
