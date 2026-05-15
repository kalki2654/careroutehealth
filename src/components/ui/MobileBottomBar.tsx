"use client";

import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-brand-border bg-white/95 backdrop-blur-lg shadow-lg md:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <Link
          href="/#assessment"
          className="flex-1 rounded-full bg-brand-dark px-4 py-3 text-center text-xs font-bold text-white"
        >
          Start Free Assessment
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full bg-[#25D366] px-4 py-3 text-center text-xs font-bold text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
