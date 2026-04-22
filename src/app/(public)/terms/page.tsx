import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Terms & Conditions | YAANA",
  description: "Terms and conditions for using YAANA Livings properties and services.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: "Terms & Conditions | YAANA",
    description: "Terms and conditions for using YAANA Livings properties and services.",
    url: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div>

      {/* Hero: dark, matching yaana contact */}
      <section className="relative py-16 lg:py-24 bg-yaana-nearblack overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white uppercase tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-white/90 mt-4 text-sm sm:text-base">
            yaanalivings redefines living with a touch of luxury, crafted for ladies and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areas—a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>

      <div className="relative max-w-3xl mx-auto px-4 py-16">
        <div className="relative z-10">
        {/* <Link href="/" className="inline-block text-lavender-700 font-semibold hover:underline mb-8">← Back to Home</Link> */}
        <h1 className="text-3xl font-serif text-yaana-charcoal mb-8">Terms & Conditions</h1>
        <div className="text-yaana-charcoal/90 space-y-4">
          <p>By using yaanalivings website, properties, or tenant app, you agree to these terms. Our properties and services are offered subject to availability and applicable laws.</p>
          <p>Rent, security deposits, and other charges are as per your agreement. Digital payments, KYC, and tenant membership are governed by our partner terms where applicable. We strive for faster complaint resolution and a 10X better living experience.</p>
          <p>For any queries, contact {CONTACT.email} or {CONTACT.phone}.</p>
        </div>
        </div>
      </div>
    </div>
  );
}

