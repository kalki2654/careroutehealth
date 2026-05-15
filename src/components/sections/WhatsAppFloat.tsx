import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with a Patient Guide"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#1FAE61] text-white shadow-lift md:grid"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.6} />
        <span className="pointer-events-none absolute right-16 w-max max-w-56 translate-x-2 rounded-xl bg-brand-dark px-3 py-2 text-xs font-bold opacity-0 shadow-soft transition-all group-hover:translate-x-0 group-hover:opacity-100">
          Chat with a Patient Guide
        </span>
      </a>
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
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-center text-xs font-bold text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
