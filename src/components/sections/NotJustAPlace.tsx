"use client";

import { SectionFade } from "@/components/ui/section-fade";

export function NotJustAPlace() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70">
      {/* Soft lavender gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 via-yaana-soft-lavender to-lavender-100" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(210,183,229,0.35) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      
      <SectionFade className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight leading-tight">
          NOT JUST A PLACE TO STAY
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-yaana-charcoal font-light tracking-wide">
          But an experience to cherish. Come over and feel the difference
        </p>
      </SectionFade>
    </section>
  );
}
