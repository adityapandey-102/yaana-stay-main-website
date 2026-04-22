import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | YAANA",
  description: "Privacy policy for YAANA. How we collect, use, and protect your information.",
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: "Privacy Policy | YAANA",
    description: "Privacy policy for YAANA. How we collect, use, and protect your information.",
    url: '/privacy',
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          {/* <p className="text-white/90 mt-4 text-sm sm:text-base">
            yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areas—a safe, comfortable, and engaging environment.
          </p> */}
        </div>
      </section>

      <div className="relative max-w-3xl mx-auto px-4 py-16">
        <div className="relative z-10">
\
        <h1 className="text-3xl font-serif text-yaana-charcoal mb-8">Privacy Policy</h1>
        <div className="text-yaana-charcoal/90 space-y-4">
          <p>yaanalivings respects your privacy. This policy describes how we collect, use, and protect your personal information when you use our website, tenant app, or services.</p>
          <p>We collect information you provide when signing up, making rent payments, or contacting us. We use it to provide our services, process payments, and improve your experience. We do not sell your data to third parties.</p>
          <p>For Smart KYC and digital services, we follow secure practices in line with our partner platforms. For questions, contact us at {CONTACT.email} or {CONTACT.phone}.</p>
        </div>
        </div>
      </div>
    </div>
  );
}
