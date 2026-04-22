"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RENTAL_PROPERTIES, FILTER_TABS } from "@/data/properties";
import { GetInTouchModal } from "../modals/GetInTouchModal";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497512.2830427995!2d77.461098!3d12.971599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6b%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1";

export function RentalPageContent() {
  const [filter, setFilter] = useState<(typeof FILTER_TABS)[number]>("All");
    const [open, setOpen] = useState(false);


  // const filtered = useMemo(() => {
  //   if (filter === "All") return RENTAL_PROPERTIES;
  //   const key = filter.toLowerCase();
  //   return RENTAL_PROPERTIES.filter((p) => p.type === key || (key === "new" && p.rating));
  // }, [filter]);
  const filtered =RENTAL_PROPERTIES;


//   function formatRupees(input: string) {
//   return input
//     .replace(/INR/gi, "₹")
//     .replace(/Rs\.?/gi, "₹")
//     .replace(/\/-+/g, "")
//     .replace(/\s{2,}/g, " ")
//     .trim();
// }
  

function formatRupeesToINR(input: string) {
  return input
    // 1. Replace symbols/prefixes (₹, Rs, Rs., INR) with "INR "
    .replace(/(?:INR|Rs\.?|₹)\s*/gi, "INR ")
    
    // 2. Clean up existing "/-" or trailing dashes to avoid "INR 100/-/-"
    .replace(/\/-+/g, "")
    
    // 3. Use regex to find the number and append the /- suffix
    // This looks for "INR" followed by digits/commas/dots
    .replace(/(INR\s?[\d,.]+)/gi, "$1/-")
    
    // 4. Clean up whitespace
    .replace(/\s{2,}/g, " ")
    .trim();
}

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: filters + list */}
      <div className="lg:col-span-2 space-y-6">
        {/* <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === tab
                  ? "bg-yaana-charcoal text-white"
                  : "bg-yaana-charcoal/5 text-yaana-charcoal hover:bg-yaana-charcoal/10"
                }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        <div className="space-y-4">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group bg-white rounded-2xl border border-lavender-200 overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 sm:grid-cols-[240px_1fr]"
            >
              <div className="relative w-full h-52 sm:h-[220px] overflow-hidden">
               {/* <div className="relative sm:w-50 h-56 sm:h-50 overflow-hidden"> */}
                {/* <Image src={p.img} alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" /> */}
                <Image
                  src={p.img[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              </div>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-yaana-charcoal">{p.name}</h2>
                  {/* {p.rating && (
                    <span className="text-xs font-medium bg-lavender-600/20 text-lavender-700 px-2 py-0.5 rounded-full flex-shrink-0">
                      {p.rating}
                    </span>
                  )} */}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.loc)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-2 inline-flex items-center gap-1 text-sm text-yaana-charcoal/70 hover:text-yaana-charcoal"
                  title={p.loc}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="block max-w-[22rem] truncate">
                    {p.loc}
                  </span>
                </a>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs text-yaana-charcoal/60 bg-lavender-100 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-yaana-charcoal font-semibold mb-4">
                  {p.priceLabel === "Starts from" ? `${formatRupeesToINR(p.price)}` : `${p.priceLabel} ${formatRupeesToINR(p.price)}`}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button asChild size="md" className="sm:flex-1  bg-yaana-charcoal hover:bg-yaana-charcoal-light">
                    <Link href={`/property-details/${p.slug}`}>View details</Link>
                  </Button>
                  <Button variant="outline" size="md" 
                  className="w-full sm:w-auto flex items-center justify-center gap-1"
                   onClick={() => setOpen(true)}
                  >
                    <PhoneCall className="w-4 h-4" />Request a Callback
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right: Map */}
      <div className="lg:col-span-1">
        <div className="rounded-card overflow-hidden h-[300px] lg:h-[400px] lg:sticky lg:top-24">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          />
        </div>
      </div>
            <GetInTouchModal open={open} onClose={() => setOpen(false)} />
      
    </div>
  );
}

