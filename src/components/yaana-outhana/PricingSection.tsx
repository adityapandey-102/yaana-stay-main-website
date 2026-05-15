import { Croissant, HandPlatter, MessageCircle, ScrollText } from "lucide-react";

import { CUSTOMIZATION_ADD_ONS, PRICING_PACKAGES } from "./data";
import { buildPricingWhatsAppLink } from "./links";

const PACKAGE_ICONS = {
  "Breakfast Package": Croissant,
  "Lunch / Dinner Package": HandPlatter,
} as const;

function getPackageIncludes(includes: string) {
  return includes.split(" + ").map((item) => item.trim());
}

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
      <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#fff9ef]/90 p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5a22]">
            Pricing Structure
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5a2316] sm:text-5xl">
            Packages from the menu card
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#6f4732]">
            The package pricing and add-on rates below are included exactly from
            the YAANA Outhana menu card.
          </p>
          <a
            href={buildPricingWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#5a2316] px-5 py-2.5 text-sm font-semibold text-[#f8ecd8] transition hover:bg-[#7b2f1f]"
          >
            <MessageCircle className="h-4 w-4" />
            Enquire Now
          </a>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {PRICING_PACKAGES.map((pkg) => {
            const Icon =
              PACKAGE_ICONS[pkg.title as keyof typeof PACKAGE_ICONS] ??
              HandPlatter;
            const includes = getPackageIncludes(pkg.includes);

            return (
              <div
                key={pkg.title}
                className="group relative overflow-hidden rounded-2xl border border-[#b78237]/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#8f5a22] via-[#e3c17d] to-[#8f5a22]" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8f5a22]">
                      {pkg.title}
                    </p>
                    <p className="mt-2 font-serif text-3xl font-semibold text-[#5a2316]">
                      {pkg.price}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#b78237]/20 bg-[#fff9ef] text-[#8f5a22] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-4 border-t border-[#b78237]/15 pt-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {includes.map((item) => (
                      <div
                        key={item}
                        className="group rounded-xl border border-[#b78237]/15 bg-[#fffaf2] px-3 py-3 shadow-sm transition hover:border-[#8f5a22]/35 hover:bg-white"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#b78237]" />
                          <p className="text-sm font-semibold leading-6 text-[#5a2316] sm:text-[15px]">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#5a2316] to-[#7c4d1e] p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <ScrollText className="h-4 w-4 text-[#e3c17d]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#e3c17d]">
              Customisation Add-Ons
            </p>
          </div>

          <div className="mt-4 divide-y divide-white/8">
            {CUSTOMIZATION_ADD_ONS.map((addOn, index) => (
              <div
                key={addOn.item}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-[#e3c17d]">
                    {index + 1}
                  </span>
                  <p className="text-sm text-[#f8ecd8]/90">{addOn.item}</p>
                </div>
                <span className="ml-4 shrink-0 rounded-full border border-[#e3c17d]/30 bg-[#e3c17d]/10 px-3 py-0.5 text-[11px] font-semibold text-[#e3c17d]">
                  {addOn.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
