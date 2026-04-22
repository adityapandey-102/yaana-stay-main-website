import type { Metadata } from "next";
import Link from "next/link";
// import Image from "next/image";
import {
  Wifi,
  Dumbbell,
  Sparkles,
  Shield,
  KeyRound,
  Utensils,
  Users,
  TreeDeciduous,
  Heart,
} from "lucide-react";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

const EXCLUSIVE_AMENITIES = [
  "High-Speed WiFi",
  "Gym & Fitness",
  "Housekeeping",
  "24/7 Security",
  "Smart KYC",
  "Dining",
  "Common Areas",
  "Green Spaces",
];

export const metadata: Metadata = {
  title: "About YAANA",
  description:
    "YAANA reimagines premium ladies accommodation in Bengaluru with stylish spaces, modern amenities, and a vibrant, community-first living experience.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About YAANA",
    description:
      "YAANA reimagines premium ladies accommodation in Bengaluru with stylish spaces, modern amenities, and a vibrant, community-first living experience.",
    url: '/about',
  },
};

const AMENITY_ICONS = [
  Wifi,
  Dumbbell,
  Sparkles,
  Shield,
  KeyRound,
  Utensils,
  Users,
  TreeDeciduous,
  Heart,
];


export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden">


      <section className="relative py-20 md:py-28  bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          <LavenderWallpaper />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Living Space
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            Elegant Living Spaces
          </h1>

          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            YAANA reimagines living with a touch of luxury—stylish spaces, premium amenities, and vibrant communities for girls and young professionals.
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


      {/* ================= ABOUT ================= */}
      {/* <section className="relative py-16 md:py-20 bg-white-- overflow-hidden">
        <LavenderWallpaper className="h-full" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-yaana-charcoal uppercase mb-6">
              About Us
            </h2>
            <div className="space-y-6 text-yaana-charcoal/90 text-base-- text-justify md:text-lg leading-relaxed">
             

              <p>
                At YAANA, we redefine modern living for girls and young professionals across Bengaluru.
                From premium ladies’ accommodations and Airbnb stays to fully furnished flats, every
                space is thoughtfully designed to offer the perfect blend of comfort, safety, and community.
              </p>

              <h2>A 10X Better Living Experience</h2>

              <p>What sets YAANA apart is our commitment to smarter, hassle-free living:</p>

              <ul>
                <li>Smart KYC for quick and secure onboarding</li>
                <li>Seamless digital payments</li>
                <li>Dedicated tenant app for easy management</li>
                <li>Faster complaint resolution</li>
                <li>Complimentary tenant insurance</li>
              </ul>

              <p>
                Every YAANA space is built to simplify your everyday life—making it more
                convenient, connected, and enjoyable.
              </p>

              <p><strong>Live Better. Live Smarter</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Secure Access", value: "24/7" },
              { label: "Response Time", value: "< 24h" },
              { label: "Premium", value: "Amenities" },
              { label: "Move-In Ready", value: "Day 1" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-card border border-lavender-200 bg-white/90 p-5 shadow-sm"
              >
                <div className="text-2xl font-semibold text-yaana-nearblack">
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-yaana-charcoal/70 mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= ABOUT ================= */}
      <section className="relative py-14 sm:py-20 md:py-28 overflow-hidden">
        <LavenderWallpaper className="h-full" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Label + Heading ── */}
          <div className="mb-10 sm:mb-14">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-lavender-500 bg-lavender-100 px-3 py-1 rounded-full mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yaana-nearblack uppercase leading-tight">
              About Us
            </h2>
            <div className="mt-3 h-1 w-10 bg-lavender-400 rounded-full" />
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

            {/* Left: Text Content */}
            <div className="space-y-5 text-yaana-charcoal/85 text-[15px] sm:text-base md:text-[17px] leading-[1.9] text-justify">
              <p>
                At YAANA, we redefine modern living for girls and young professionals across Bengaluru.
                From premium ladies&apos; accommodations and Airbnb stays to fully furnished flats, every
                space is thoughtfully designed to offer the perfect blend of comfort, safety, and community.
              </p>

              {/* Callout block */}
              <div className="rounded-xl border border-lavender-200 bg-white/80 px-5 py-4 sm:px-6 sm:py-5">
                <h2 className="text-base sm:text-lg font-bold text-yaana-nearblack mb-1.5 uppercase tracking-wide">
                  A 10X Better Living Experience
                </h2>
                <p className="text-sm sm:text-[15px] text-yaana-charcoal/75 mb-0">
                  What sets YAANA apart is our commitment to smarter, hassle-free living:
                </p>
              </div>

              {/* Feature List */}
              <ul className="space-y-2.5">
                {[
                  "Smart KYC for quick and secure onboarding",
                  "Seamless digital payments",
                  "Dedicated tenant app for easy management",
                  "Faster complaint resolution",
                  "Complimentary tenant insurance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px] sm:text-[15px] md:text-base">
                    <span className="flex-shrink-0 h-[7px] w-[7px] rounded-full bg-lavender-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <p>
                Every YAANA space is built to simplify your everyday life—making it more
                convenient, connected, and enjoyable.
              </p>

              <p className="font-bold text-yaana-nearblack tracking-wide text-base sm:text-lg">
                Live Better. Live Smarter.
              </p>
            </div>

            {/* Right: Stat Cards — 2×2 grid, full-width on mobile */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Secure Access", value: "24/7" },
                { label: "Response Time", value: "< 24h" },
                { label: "Premium", value: "Amenities" },
                { label: "Move-In Ready", value: "Day 1" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative rounded-2xl bg-white/95 border border-lavender-200 p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[110px] sm:min-h-[130px] overflow-hidden"
                >
                  {/* Decorative top corner accent */}
                  <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-lavender-500 rounded-bl-2xl" />

                  <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-lavender-600 mb-3">
                    {item.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-yaana-nearblack leading-none">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= AMENITIES ================= */}
      <section className="py-16 md:py-20 bg-lavender-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-nearblack uppercase mb-4">
            Exclusive Amenities
          </h2>

          <p className="max-w-2xl mx-auto text-yaana-charcoal mb-12 text-sm md:text-base">
            Everything you need for a comfortable and connected lifestyle.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {EXCLUSIVE_AMENITIES.map((label, i) => {
              const Icon = AMENITY_ICONS[i] ?? Heart;
              return (
                <div
                  key={label}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full border border-lavender-200 bg-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-lavender-700" />
                  </div>
                  <span className="text-yaana-nearblack text-xs sm:text-sm uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY ================= */}
      <GoogleReviews />

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase mb-4">
            Not Just a Place to Stay
          </h2>

          <p className="text-yaana-charcoal/80 mb-8">
            Curated experiences you will cherish. Come and feel the difference.
          </p>

          <Link
            href="/rental"
            className="inline-block px-8 py-3 bg-lavender-700 text-white rounded-full font-medium hover:bg-lavender-800 transition"
          >
            View Our Properties {"\u003e"}
          </Link>
        </div>
      </section>
    </div>
  );
}
