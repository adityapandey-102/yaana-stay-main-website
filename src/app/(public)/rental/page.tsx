import type { Metadata } from "next";
import { RentalPageContent } from "@/components/rental/RentalPageContent";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

export const metadata: Metadata = {
  title: "Properties in Bengaluru | YAANA",
  description:
    "Explore YAANA’s luxury & fully furnished ladies accommodation across Bengaluru — flexible room options, secure gated living, and premium amenities.",
  alternates: {
    canonical: "/rental",
  },
  openGraph: {
    title: "Properties in Bengaluru | YAANA",
    description:
      "Explore YAANA’s luxury & fully furnished ladies accommodation across Bengaluru — flexible room options, secure gated living, and premium amenities.",
    url: "/rental",
  },
};

export default function RentalPage() {
  return (
    <div className="w-full overflow-hidden ">
      {/* ================= HERO ================= */}
      <section className="relative bg-yaana-nearblack-- bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70 py-24 md:py-32">
        <div className="absolute inset-0">
          {/* <Image
            src="/assets/hero-bg.webp"
            alt="Comfortable Residences"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          /> */}
          <LavenderWallpaper/>
          {/* <div className="absolute inset-0 bg-gradient-to-br from-yaana-nearblack/95 via-yaana-nearblack/80 to-yaana-dark-lavender/60" /> */}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white--">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Living Space
          </span>
          <h1 className="mt-4 text-3xl font-semibold uppercase tracking-tight sm:text-4xl md:text-5xl">
            Luxury & Fully Furnished Ladies Accommodation
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-white/90-- sm:text-base md:text-lg">
             YAANA elevates living with a touch of luxury—stylish rooms, premium amenities, and vibrant spaces designed for ladies and young professionals near top educational hubs
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Flexible Room Options
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Secure Gated Living
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Community First
            </span>
          </div>
        </div>
      </section>

      {/* ================= PROPERTIES SECTION ================= */}
      <section className="relative py-16 md:py-20">
        {/* Decorative Corners - FULL WIDTH */}
        <LavenderWallpaper />

        {/* Centered Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-lavender-200/70 bg-white/90 p-6 shadow-lg backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-yaana-charcoal md:text-3xl">
                Our Properties Across Bengaluru
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-yaana-charcoal/80 md:text-base">
                Premium shared accommodation with modern amenities and a vibrant community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs uppercase tracking-wide text-yaana-charcoal/60 md:grid-cols-4">
              <div className="rounded-xl border border-lavender-200/70 bg-lavender-50/70 px-3 py-3">
                <p className="text-lg font-semibold text-yaana-charcoal">4</p>
                <p className="mt-1">Locations</p>
              </div>
              <div className="rounded-xl border border-lavender-200/70 bg-lavender-50/70 px-3 py-3">
                <p className="text-lg font-semibold text-yaana-charcoal">24/7</p>
                <p className="mt-1">Security</p>
              </div>
              <div className="rounded-xl border border-lavender-200/70 bg-lavender-50/70 px-3 py-3">
                <p className="text-lg font-semibold text-yaana-charcoal">WiFi</p>
                <p className="mt-1">Included</p>
              </div>
              <div className="rounded-xl border border-lavender-200/70 bg-lavender-50/70 px-3 py-3">
                <p className="text-lg font-semibold text-yaana-charcoal">Premium</p>
                <p className="mt-1">Amenities</p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <RentalPageContent />
          </div>
        </div>
      </section>
    </div>
  );
}
