import { MessageCircle, Phone } from "lucide-react";

import { PHONE_NUMBER } from "./data";
import { buildKitchenEnquiryWhatsAppLink } from "./links";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={buildKitchenEnquiryWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call YAANA Outhana"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5a2316] text-[#f8ecd8] shadow-[0_14px_30px_rgba(90,35,22,0.28)] transition hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
