import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { LIFE_GALLERIES } from "@/data/lifeAtYaanaGallery";


import {
  MapPin,
  Bed,
  Wind,
  Wifi,
  Sparkles,
  ShieldCheck,
  Utensils,
  BookOpen,
  Car,
  Zap,
  Droplet,
  Snowflake,
  Fan,
  Refrigerator,
  Microwave,
  Tv,
  Sofa,
  Lamp,
  KeyRound,
  BadgeCheck,
  Users,
  Leaf,
  ShowerHead,
  Cctv,
  Camera,
  Fingerprint,
  ArrowUpDown,
  Shirt,
  DoorClosed,
  Footprints,
  Dumbbell,
  WashingMachine,
  CookingPot,
} from "lucide-react";
import { PropertyShareButtons } from "@/components/property/PropertyShareButtons";
import { PropertyImageGallery } from "@/components/property/PropertyImageGallery";
import { getBaseUrl } from "@/lib/site";
import { RENTAL_PROPERTIES, getPropertyBySlug } from "@/data/properties";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";


const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497512.2830427995!2d77.461098!3d12.971599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6b%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1";

const SITE_URL = "https://yaanalivings.com";

const INFO = [
  { icon: Phone, label: "Phone", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: MapPin, label: "Location", value: CONTACT.location },
  { icon: Clock, label: "Working Time", value: CONTACT.workingTime },
];

function normalizeText(input: string) {
  return input.replace(/\bpg\b/gi, "accommodation");
}

// function normalizeTag(input: string) {
//   const cleaned = normalizeText(input);
//   if (/ladies/i.test(cleaned)) {
//     return cleaned.replace(/ladies/gi, "Women's");
//   }
//   return cleaned;
// }

// function normalizeName(input: string) {
//   return input.replace(/yaana home/gi, "YAANA Home");
// }

// function formatRupees(input: string) {
//   return input
//     .replace(/INR/gi, "₹")
//     .replace(/Rs\.?/gi, "₹")
//     .replace(/\/-+/g, "")
//     .replace(/\s{2,}/g, " ")
//     .trim();
// }

const AMENITY_ICON_RULES = [
  { icon: Bed, keywords: ["cot", "bed", "mattress"] },
  { icon: DoorClosed, keywords: ["cupboard", "wardrobe", "curtain"] },
  { icon: Lamp, keywords: ["dressing table", "lamp", "lighting"] },
  { icon: BookOpen, keywords: ["study table", "study", "chair", "desk"] },
  { icon: Footprints, keywords: ["shoe rack"] },
  { icon: Shirt, keywords: ["iron board", "ironing"] },
  {
    icon: CookingPot,
    keywords: ["cooking facility", "self-cooking", "kitchen", "dining", "meal", "food", "mess"],
  },
  { icon: WashingMachine, keywords: ["washing machine", "laundry"] },
  { icon: Dumbbell, keywords: ["gym", "fitness"] },
  { icon: ArrowUpDown, keywords: ["lift", "elevator"] },
  { icon: Zap, keywords: ["power backup", "electricity", "power"] },
  { icon: Wifi, keywords: ["wifi", "wi-fi", "internet"] },
  { icon: Cctv, keywords: ["cctv"] },
  { icon: Fingerprint, keywords: ["biometric"] },
  { icon: ShieldCheck, keywords: ["security", "guard", "24/7", "24-hour"] },
  { icon: ShowerHead, keywords: ["hot water", "shower", "geyser", "bathroom"] },
  { icon: Droplet, keywords: ["drinking water", "water purifier", "water"] },
  { icon: Snowflake, keywords: ["air conditioning", "ac"] },
  { icon: Tv, keywords: ["tv", "television"] },
  { icon: Refrigerator, keywords: ["refrigerator", "fridge"] },
  { icon: Sofa, keywords: ["lounge", "chilling", "common room"] },
  { icon: Sparkles, keywords: ["maids", "cleaning", "housekeeping"] },
  { icon: Users, keywords: ["female-only", "women", "community"] },
  { icon: BadgeCheck, keywords: ["premium", "modern"] },
  { icon: Leaf, keywords: ["green", "eco", "sustainable"] },
  { icon: Fan, keywords: ["fan", "ventilation"] },
  { icon: Microwave, keywords: ["microwave", "oven"] },
  { icon: KeyRound, keywords: ["access", "key", "keyless"] },
  { icon: Car, keywords: ["parking"] },
  { icon: Utensils, keywords: ["utensils", "dining"] },
] as const;

function amenityIcon(label: string) {
  const value = label.toLowerCase();
  const match = AMENITY_ICON_RULES.find((rule) =>
    rule.keywords.some((keyword) => value.includes(keyword)),
  );
  return match?.icon ?? Bed;
}

function cleanFacilityLabel(label: string) {
  return normalizeText(label).replace(/\s{2,}/g, " ").trim();
}

export async function generateStaticParams() {
  return RENTAL_PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export const dynamicParams = false;

function absoluteImageUrl(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getPropertyBySlug(params.slug);
  if (!p) return { title: "Property | YAANA" };

  const canonicalUrl = `${SITE_URL}/property-details/${p.slug}`;
  const description = `${normalizeText(p.tagline)}. ${normalizeText(
    p.positioning,
  )}`;
  // const titleName = normalizeName(p.name);
  const titleName = p.name;

  return {
    title: `${titleName} | YAANA`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${titleName} | YAANA`,
      description,
      url: canonicalUrl,
      images: [absoluteImageUrl(p.img[0])],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleName} | YAANA`,
      description,
      images: [absoluteImageUrl(p.img[0])],
    },
  };
}

export default function PropertiesDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getPropertyBySlug(params.slug);
  if (!p) notFound();

  const shareUrl = `${getBaseUrl()}/property-details/${params.slug}`;
  const facilities = p.facilities
    .map(cleanFacilityLabel)
    .filter(
      (facility, index, all) =>
        all.findIndex((item) => item.toLowerCase() === facility.toLowerCase()) ===
        index,
    );
  // const displayName = normalizeName(p.name);
  const displayName = p.name;

  const galleryId = p.slug.toLowerCase();
  const matchedGallery =
    LIFE_GALLERIES.find((gallery) => gallery.id === galleryId) ??
    LIFE_GALLERIES.find((gallery) => gallery.id === `${galleryId}s`);
  const galleryImages = matchedGallery?.images.map((img) => img.src) ?? p.img;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: displayName,
    description: `${normalizeText(p.tagline)}. ${normalizeText(p.positioning)}`,
    image: absoluteImageUrl(p.img[0]),
    address: {
      "@type": "PostalAddress",
      streetAddress: p.loc,
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    url: `${SITE_URL}/property-details/${p.slug}`,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b-- from-lavender-50 via-white to-lavender-50/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LavenderWallpaper />

      <section className="relative overflow-hidden bg-yaana-nearblack/95-- py-20 lg:py-28">
        <div className="absolute inset-0">
          {/* <Image
            src="/assets/hero-bg.webp"
            alt={p.name}
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          /> */}
          <LavenderWallpaper />
          <div className="absolute inset-0 bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-black sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70-- text-black">
            Premium Living Experience
          </p>
          <h1 className="mt-4 text-3xl font-semibold uppercase tracking-tight sm:text-4xl md:text-5xl">
            {displayName}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-white/90-- text-black sm:text-base md:text-lg">
            {normalizeText(p.tagline)}
          </p>
          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              {normalizeTag(p.type)}
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              {normalizeText(p.room)}
            </span>
          </div> */}
        </div>
      </section>

      <section className="relative -mt-16 pb-12">
        {/* <LavenderWallpaper/> */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-lavender-200/70 bg-white/85 p-5 shadow-lg backdrop-blur sm:p-7">
            {/* <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <p className="flex items-start gap-2 text-sm text-yaana-charcoal/80 sm:text-base">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{p.loc}</span>
              </p>
              <PropertyShareButtons url={shareUrl} title={displayName} />
            </div> */}

            <PropertyImageGallery
              title={displayName}
              previewImages={p.img}
              images={galleryImages}
            />

            {/* <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-lavender-50/60 p-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Starting Price
                </p>
                <p className="mt-1 text-xl font-semibold text-yaana-charcoal">
                  {p.price}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Room Options
                </p>
                <p className="mt-1 text-base font-medium text-yaana-charcoal">
                  {p.room}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Utilities Included
                </p>
                <p className="mt-1 text-base font-medium text-yaana-charcoal">
                  {p.utilitiesIncluded.join(", ")}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <LavenderWallpaper/> */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-lavender-200 bg-white/85 p-6 backdrop-blur lg:col-span-2">
            <h2 className="text-2xl font-semibold text-yaana-charcoal">
              About {displayName}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-yaana-charcoal/90 sm:text-base">
              <p>{normalizeText(p.positioning)}</p>
              <p>
                YAANA offers a premium living experience with curated interiors,
                thoughtful services, and a calm environment built around womens
                success.
              </p>
              <p>
                <span className="font-semibold text-yaana-charcoal">
                  Suitable For:
                </span>{" "}
                {p.audience}
              </p>
            </div>
            <div className="mb-5 mt-7 flex flex-wrap items-start justify-between gap-4 text-sm leading-relaxed text-yaana-charcoal/90   sm:text-base">
              <p className="flex items-start gap-2 ">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{p.loc}</span>
              </p>
              <div className="mt-4">
                <PropertyShareButtons url={shareUrl} title={displayName} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-lavender-200 bg-white/85 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-yaana-charcoal">
              Pricing
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-lavender-200/70 bg-white/70">
              <table className="w-full text-sm text-yaana-charcoal/90">
                <thead className="bg-lavender-50/80 text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Monthly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.pricing.map((price) => (
                    <tr
                      key={price.label}
                      className="border-t border-lavender-200/60"
                    >
                      <td className="px-4 py-3 font-medium">
                        {price.label}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {/* {formatRupees(price.amountPerMonth)} / month */}
                        {price.amountPerMonth} / month
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-lavender-200/60">
                    <td className="px-4 py-3 font-medium">Deposit</td>
                    <td className="px-4 py-3 text-right">
                      {/* {formatRupees(p.deposit)} */}
                      {p.deposit}
                    </td>
                  </tr>
                  <tr className="border-t border-lavender-200/60">
                    <td className="px-4 py-3 font-medium">Maintenance</td>
                    <td className="px-4 py-3 text-right">
                      {/* {formatRupees(p.maintenance)} */}
                      {p.maintenance}
                    </td>
                  </tr>
                  <tr className="border-t border-lavender-200/60">
                    <td className="px-4 py-3 font-medium">Food</td>
                    <td className="px-4 py-3 text-right">
                      {/* {formatRupees(p.food)} */}
                      {p.food}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">Amenities</h2>
        <p className="mt-2 max-w-3xl text-sm text-yaana-charcoal/75">
          Curated services and in-room comforts that elevate everyday living.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {facilities.map((facility) => {
            const Icon = amenityIcon(facility);
            return (
              <div
                key={facility}
                className="rounded-2xl border border-lavender-200 bg-white/85 p-4 text-center shadow-sm backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-lavender-300/80 hover:bg-white"
              >
                <Icon className="mx-auto h-7 w-7 text-yaana-charcoal" />
                <p className="mt-2 text-sm font-medium text-yaana-charcoal">
                  {facility}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-lavender-200/70 bg-gradient-to-br from-white via-lavender-50/60 to-white p-6 shadow-xl sm:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lavender-200/40 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-lavender-100/60 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-yaana-charcoal/60">
                Location & Contact
              </p>
              <h2 className="text-2xl font-semibold text-yaana-charcoal">
                FIND {displayName}
              </h2>
              <p className="text-sm text-yaana-charcoal/80">
                Premium accommodation with effortless connectivity, curated
                services, and a welcoming community right where you need it.
              </p>
              <div className="rounded-2xl border border-lavender-200/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-yaana-charcoal/60">
                  Address
                </p>
                <p className="mt-2 text-sm font-medium text-yaana-charcoal">
                  {p.loc}
                </p>
              </div>
              {p.loc && (
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.loc)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-btn border border-yaana-charcoal/20 bg-white/80 px-5 py-2.5 text-sm font-medium text-yaana-charcoal transition hover:-translate-y-0.5 hover:border-yaana-charcoal/40 hover:bg-white"
                >
                  <MapPin className="h-4 w-4" />
                  Get directions
                </Link>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-yaana-charcoal/5 transition hover:bg-yaana-charcoal/10">
                      <Icon className="h-5 w-5 text-yaana-charcoal" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-yaana-charcoal">
                        {label}
                      </p>
                      <p className="text-sm leading-snug text-yaana-charcoal/90">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center justify-center rounded-btn border border-yaana-charcoal/20 bg-white/80 px-5 py-2.5 text-sm font-medium text-yaana-charcoal transition hover:-translate-y-0.5 hover:border-yaana-charcoal/40 hover:bg-white"
                >
                  Call now
                </Link>
                <Link
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center justify-center rounded-btn bg-yaana-charcoal px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-yaana-charcoal/90"
                >
                  Email us
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border  h-[220px] w-full sm:h-[260px] lg:h-[500px]border-lavender-200/70 bg-white/80  shadow-sm">
              <div className="overflow-hidden rounded-2xl">
                <iframe
                  src={p.map_url ?? MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                  className="h-[220px] w-full sm:h-[260px] lg:h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">
          Life at YAANA
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LIFE_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-2xl border border-lavender-200 bg-white/70 backdrop-blur"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section> */}

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">
          FAQs on Living at YAANA
        </h2>
        <div className="mt-6 space-y-4">
          {p.faqs.map(({ id, question, answer }) => (
            <div
              key={id}
              className="rounded-2xl border border-lavender-200 bg-white/85 p-5 backdrop-blur"
            >
              <p className="font-semibold text-yaana-charcoal">{question}</p>
              <p className="mt-2 text-sm text-yaana-charcoal/80">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="bg-yaana-nearblack py-10">
        <p className="px-4 text-center text-lg text-white md:text-xl">
          Every story deserves a chapter called yaanalivings!
        </p>
      </section> */}

      <section className="relative bg-lavender-50-- py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/rental"
            className="inline-block rounded-btn bg-lavender-600 px-6 py-2.5 font-medium text-white hover:bg-lavender-700"
          >
            Back to all properties
          </Link>
        </div>
      </section>
    </div>
  );
}
