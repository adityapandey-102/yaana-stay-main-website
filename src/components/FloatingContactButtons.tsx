"use client";

import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/contact";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

const whatsappNumber = onlyDigits(CONTACT.whatsapp);
const phoneDigits = onlyDigits(CONTACT.phone);
const phoneHref = `tel:${phoneDigits}`;
const whatsappText = encodeURIComponent(
  "Hi  YAANA, I would like to know more about your properties."
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

export function FloatingContactButtons() {
  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3">
      <a
        href={phoneHref}
        aria-label="Call"
        title="Call  YAANA"
        className="w-12 h-12 rounded-full bg-lavender-600 flex items-center justify-center text-white shadow-lg hover:bg-lavender-700 transition"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white shadow-lg hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}

