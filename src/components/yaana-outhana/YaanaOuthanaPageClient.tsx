"use client";

import { useMemo, useState } from "react";

import { AboutSection } from "./AboutSection";
import {
  DEFAULT_OPEN_MENU_SECTIONS,
  MENU_SECTIONS,
} from "./data";
import { FloatingActions } from "./FloatingActions";
import { HeroSection } from "./HeroSection";
import { EssentialsAndNoteSection, FooterSection } from "./InfoSections";
import { MenuSection } from "./MenuSection";
import { Navigation } from "./Navigation";
import { PricingSection } from "./PricingSection";

export function YaanaOuthanaPageClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(
    DEFAULT_OPEN_MENU_SECTIONS,
  );

  const sectionCountLabel = useMemo(
    () => `${MENU_SECTIONS.length} curated menu sections`,
    [],
  );

  const toggleSection = (title: string) => {
    setOpenSections((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  return (
    <div className="min-h-screen bg-[#f5ead5] text-[#3d2018]">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,126,43,0.24),_transparent_32%),linear-gradient(180deg,rgba(84,39,24,0.05),rgba(84,39,24,0.12))]" />
        <div className="absolute inset-3 rounded-[2rem] border border-[#8f5a22]/20" />
        <div className="absolute inset-6 rounded-[1.65rem] border border-[#8f5a22]/10" />
      </div>

      <Navigation
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main>
        <HeroSection sectionCountLabel={sectionCountLabel} />
        <AboutSection />
        <MenuSection
          openSections={openSections}
          onToggleSection={toggleSection}
        />
        <PricingSection />
        <EssentialsAndNoteSection />
      </main>

      <FooterSection />
      <FloatingActions />
    </div>
  );
}
