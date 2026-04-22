import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";
import { CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact | YAANA",
  description: `Book a visit or get in touch with YAANA in Bengaluru. Email: ${CONTACT.email}, Phone: ${CONTACT.phone}.`,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact | YAANA",
    description: `Book a visit or get in touch with YAANA Livings in Bengaluru. Email: ${CONTACT.email}, Phone: ${CONTACT.phone}.`,
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>

      <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          <LavenderWallpaper />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Living Space
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            Premium Living Space
          </h1>

          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Premium accommodation with effortless connectivity, curated services, and a welcoming community right where you need it
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rental"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-yaana-nearblack transition hover:bg-white/90"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white-- transition hover:bg-white/10"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>

      <div className="relative">
        <LavenderWallpaper />
        <div className="relative z-10">
          <ContactPageContent />
        </div>
      </div>
    </>
  );
}
