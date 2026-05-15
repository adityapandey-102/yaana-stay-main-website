"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

import { MENU_SECTIONS } from "./data";
import { buildCategoryWhatsAppLink } from "./links";

type MenuSectionProps = {
  openSections: string[];
  onToggleSection: (title: string) => void;
};

export function MenuSection({
  openSections,
  onToggleSection,
}: MenuSectionProps) {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5a22]">
          Commercial Kitchen Menu
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5a2316] sm:text-5xl">
          Explore the menu by variety
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#6f4732]">
          Browse each variety, view the items, and tap any dish to send a
          WhatsApp enquiry directly to the kitchen.
        </p>
      </div>

      <div className="space-y-4">
        {MENU_SECTIONS.map((section, index) => {
          const isOpen = openSections.includes(section.title);

          return (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
              className="overflow-hidden rounded-[1.75rem] border border-[#8f5a22]/15 bg-[#fff9ef]/90 shadow-sm"
            >
              <button
                type="button"
                onClick={() => onToggleSection(section.title)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
                aria-expanded={isOpen}
              >
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8f5a22]">
                      Variety {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[#5a2316] sm:text-3xl">
                      {section.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6f4732]">
                      {section.subtitle}
                    </p>
                  </div>
                  <a
                    href={buildCategoryWhatsAppLink(section.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="hidden shrink-0 self-center items-center gap-2 rounded-full bg-[#5a2316] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f8ecd8] transition hover:bg-[#7b2f1f] sm:inline-flex"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Enquire Now
                  </a>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#b78237]/25 bg-white text-[#5a2316]">
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#8f5a22]/10 px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
                      <a
                        href={buildCategoryWhatsAppLink(section.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#5a2316] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f8ecd8] transition hover:bg-[#7b2f1f] sm:hidden"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Enquire Now
                      </a>
                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                        {section.items.map((item) => (
                          <div
                            key={item}
                            className="group rounded-xl border border-[#b78237]/15 bg-white/80 px-3 py-3 shadow-sm transition hover:border-[#8f5a22]/35 hover:bg-white"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#b78237]" />
                              <div>
                                <p className="text-sm font-semibold leading-6 text-[#5a2316] sm:text-[15px]">
                                  {item}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          );
        })}
      </div>
    </section>
  );
}
