import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";

const services = [
  "Hospital Shortlisting",
  "Treatment Cost Comparison",
  "Second Opinion Coordination",
  "Travel and Visa Support",
  "Post-Treatment Follow-Up"
];

const treatments = ["Cardiac Care", "Cancer Care", "Orthopaedics", "Fertility and IVF", "All Treatments"];

export function SiteFooter() {
  return (
    <footer className="site-grid bg-[#071d1b] pb-24 pt-10 text-white/85 md:py-14">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <Link href="/#top" className="flex items-center gap-3" aria-label="CareRoute Health home">
            <BrandLogo variant="light" className="h-10 w-10 md:h-11 md:w-11" />
            <span>
              <span className="block font-serif text-xl font-semibold leading-none text-white md:text-2xl">CareRoute Health</span>
              <span className="mt-1 block text-xs md:mt-2 md:text-sm">Guided from your first question to your full recovery.</span>
            </span>
          </Link>
          <p className="mt-5 text-xs leading-6 md:mt-8 md:text-sm md:leading-7">
            CareRoute Health is a patient coordination and guidance service. We are not a hospital, clinic, or licensed
            medical provider. All medical decisions are made solely by qualified healthcare professionals.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Services</h3>
          <div className="grid gap-1.5 text-xs md:gap-3 md:text-sm">
            {services.map((service) => (
              <Link key={service} href="/#how" className="hover:text-white">
                {service}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Treatments</h3>
          <div className="grid gap-1.5 text-xs md:gap-3 md:text-sm">
            {treatments.map((treatment) => (
              <Link key={treatment} href="/#treatments" className="hover:text-white">
                {treatment}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h3 className="mb-3 text-sm font-extrabold uppercase text-white md:mb-5">Contact</h3>
          <div className="grid gap-1.5 text-xs md:gap-3 md:text-sm">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp CareRoute
            </a>
            <a href="mailto:hello@careroute.health" className="hover:text-white">
              hello@careroute.health
            </a>
            <span>Mumbai, India</span>
            <span>Instagram / LinkedIn / YouTube / Facebook</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs md:mt-12 md:flex-row md:gap-4 md:pt-8 md:text-sm">
        <span className="flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <span>/</span>
          <Link href="/medical-disclaimer" className="hover:text-white">Medical Disclaimer</Link>
          <span>/</span>
          <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
        </span>
        <span>Copyright 2026 CareRoute Health. All rights reserved.</span>
      </div>
    </footer>
  );
}
