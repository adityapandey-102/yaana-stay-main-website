import { Clock3, MapPin, MessageCircle, Phone, ScrollText, Soup } from "lucide-react";

import { DINING_ESSENTIALS, PHONE_NUMBER } from "./data";
import { buildKitchenEnquiryWhatsAppLink } from "./links";

export function EssentialsAndNoteSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#fff9ef]/85 p-8 shadow-sm">
          <div className="flex items-center gap-3 text-[#8f5a22]">
            <Soup className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              Dining Essentials
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {DINING_ESSENTIALS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#b78237]/15 bg-white/75 px-4 py-4 text-sm font-medium text-[#5a2316]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[linear-gradient(135deg,#5a2316,#7c4d1e)] p-8 text-[#f8ecd8] shadow-sm">
          <div className="flex items-center gap-3 text-[#e3c17d]">
            <ScrollText className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              Menu Note
            </p>
          </div>
          <p className="mt-5 text-base leading-8 text-[#f3e4ca]">
            Bringing tradition to your table, one meal at a time. Browse the
            full variety list, review the package pricing, and connect with the
            kitchen for custom orders and event enquiries.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="mt-10 border-t border-[#7b4a1d]/15 bg-[#4a1d13] text-[#f8ecd8]"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b16d]">
            YAANA Outhana
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">
            Flavours of Tradition
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#ecd9bc]">
            Browse the menu and connect with the kitchen on WhatsApp for
            catering and event enquiries.
          </p>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d7b16d]" />
            <p className="text-sm leading-7 text-[#f4e7d3]">
              18, 1st Main Rd, Chikkamaranahalli, M S R Nagar, Mathikere,
              Bengaluru, Karnataka 560054
            </p>
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 text-sm font-medium text-[#f8ecd8]"
          >
            <Phone className="h-4 w-4 text-[#d7b16d]" />
            {PHONE_NUMBER}
          </a>
          <a
            href={buildKitchenEnquiryWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b16d] px-5 py-3 text-sm font-semibold text-[#4a1d13] transition hover:bg-[#ebc985]"
          >
            <MessageCircle className="h-4 w-4" />
            Open WhatsApp Enquiry
          </a>
          <a
            href="mailto:yaanastays@gmail.com"
            className="text-sm font-medium text-[#f8ecd8]"
          >
            yaanastays@gmail.com
          </a>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#d7b16d]">
            <Clock3 className="h-4 w-4" />
            Breakfast from {"\u20B9"}150 per plate
          </div>
        </div>
      </div>
    </footer>
  );
}
