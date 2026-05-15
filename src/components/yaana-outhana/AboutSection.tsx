import { Leaf } from "lucide-react";

import { SERVICE_HIGHLIGHTS } from "./data";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#fff9ef]/85 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5a22]">
            Bringing Tradition To Your Table
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#5a2316] sm:text-4xl">
            A Traditional Feast Experience
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6f4732]">
            YAANA Outhana brings together traditional flavours, festive warmth,
            and curated menu choices for every occasion. Open a menu category and
            tap any dish to enquire directly on WhatsApp.
          </p>
        </div>

        <div
          id="speciality"
          className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#5a2316] p-8 text-[#f8ecd8] shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-[#d7b16d]" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d7b16d]">
              Authentic South Indian Cuisine For Every Occasion
            </p>
          </div>
          <div className="mt-5 space-y-4">
            {SERVICE_HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
