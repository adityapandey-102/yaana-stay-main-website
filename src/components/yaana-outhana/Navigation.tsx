"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";

import { LOGO_SRC, NAV_LINKS, PHONE_NUMBER } from "./data";
import { buildKitchenEnquiryWhatsAppLink } from "./links";

type NavigationProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

export function Navigation({
  menuOpen,
  onOpenMenu,
  onCloseMenu,
}: NavigationProps) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#7b4a1d]/15 bg-[#f7ecd8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/yaana-outhana" className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#b78237]/40 bg-white shadow-md shadow-[#7b4a1d]/10">
              <Image
                src={LOGO_SRC}
                alt="Yaana Outhana logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5a22]">
                Shri Chowdeshwari
              </p>
              <p className="font-serif text-2xl font-semibold text-[#5a2316]">
                YAANA Outhana
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5a2316] transition-colors hover:text-[#8f5a22]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildKitchenEnquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#5a2316] px-5 py-2.5 text-sm font-semibold text-[#f8ecd8] shadow-lg shadow-[#5a2316]/15 transition hover:bg-[#7b2f1f]"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire Now
            </a>
          </nav>

          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8f5a22]/25 bg-white/80 text-[#5a2316] md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#2b130d]/45"
              onClick={onCloseMenu}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[84vw] max-w-sm flex-col bg-[#5a2316] px-6 py-6 text-[#f8ecd8]"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-serif text-2xl font-semibold">YAANA Outhana</p>
                <button
                  type="button"
                  onClick={onCloseMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onCloseMenu}
                    className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto space-y-3 pt-8">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={buildKitchenEnquiryWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Kitchen
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
