import Image from "next/image";
import { ChevronRight, MessageCircle, Sparkles } from "lucide-react";

import { PAMPHLET_SRC } from "./data";
import { buildKitchenEnquiryWhatsAppLink } from "./links";

type HeroSectionProps = {
  sectionCountLabel: string;
};

export function HeroSection({ sectionCountLabel }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b78237]/30 bg-[#fff9ef]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5a22]">
            <Sparkles className="h-3.5 w-3.5" />
            Flavours of Tradition
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.33em] text-[#8f5a22]">
              A Traditional Feast Experience
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.92] text-[#5a2316] sm:text-6xl lg:text-7xl">
              YAANA
              <span className="block text-[#8f5a22]">Outhana</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#6f4732]">
              Authentic South Indian cuisine for every occasion. Traditional menu
              selections for enquiries, catering, and celebrations.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#b78237]/20 bg-[#fff9ef]/85 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5a22]">
                Menu Scope
              </p>
              <p className="mt-2 text-lg font-semibold text-[#5a2316]">
                {sectionCountLabel}
              </p>
            </div>
            <div className="rounded-3xl border border-[#b78237]/20 bg-[#fff9ef]/85 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5a22]">
                Enquiry Method
              </p>
              <p className="mt-2 text-lg font-semibold text-[#5a2316]">
                Use the Enquire Now buttons for each variety
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-[#5a2316] px-6 py-3 text-sm font-semibold text-[#f8ecd8] shadow-lg shadow-[#5a2316]/15 transition hover:bg-[#7b2f1f]"
            >
              Explore Menu
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href={buildKitchenEnquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#8f5a22]/35 bg-[#fff9ef]/85 px-6 py-3 text-sm font-semibold text-[#5a2316] transition hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Kitchen
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(183,130,55,0.32),_transparent_52%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#8f5a22]/20 bg-[#fff8ec] p-3 shadow-[0_24px_80px_rgba(90,35,22,0.16)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[#b78237]/20">
              <Image
                src={PAMPHLET_SRC}
                alt="Yaana Outhana traditional kitchen pamphlet"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 44vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
