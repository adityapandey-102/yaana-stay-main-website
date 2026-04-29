"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import {
  WashingMachine, Shirt, Zap, ShieldCheck, Heart, Clock,
  MapPin, ArrowUpRight, ChevronRight, LucideIcon, Sparkles,
  Download, Instagram, Facebook, MessageCircle, Expand, Menu, X,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  icon: LucideIcon;
  label: string;
  desc: string;
  step: string;
}

interface Feature {
  icon: LucideIcon;
  label: string;
  desc: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  { icon: WashingMachine, label: "Washed", desc: "Deep clean for fresh & hygienic clothes", step: "01" },
  { icon: Shirt, label: "Dried", desc: "Properly dried with care and attention", step: "02" },
  { icon: Zap, label: "Ironed", desc: "Neatly ironed and ready to wear", step: "03" },
];

const FEATURES: Feature[] = [
  { icon: ShieldCheck, label: "Safe & Secure", desc: "Handled with care and respect" },
  { icon: Heart, label: "Trusted Service", desc: "Exclusively for Yaana girls" },
  { icon: Clock, label: "Time Saver", desc: "More time for what matters" },
  { icon: Shirt, label: "Fresh. Neat. You.", desc: "Because you deserve the best" },
];

const PRICING_TAGS = ["No hidden fees", "Pay on pickup", "5 kg per batch"] as const;
const HERO_IMAGE_SRC = "/assets/yaana-breeze.jpeg";
const HERO_IMAGE_ALT = "Yaana Breeze laundry service poster";
const BREEZE_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/life-at-yaana", label: "Life @ YAANA" },
  { href: "/about", label: "About Us" },
  { href: "/rental", label: "Properties" },
  { href: "/contact", label: "Contact Us" },
] as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel: FC<{ text: string }> = ({ text }) => (
  <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-[#815AC0]">{text}</p>
);

const StepCard: FC<Step> = ({ icon: Icon, label, desc, step }) => (
  <div className="group flex flex-col items-center gap-3 rounded-3xl border border-[#E8D9F5] bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-[#815AC0]/10">
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F0E6FA] to-[#E0CCEF] shadow-inner transition-transform group-hover:scale-105">
        <Icon className="h-7 w-7 text-[#815AC0]" />
      </div>
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#815AC0] text-[9px] font-bold text-white shadow">
        {step}
      </span>
    </div>
    <div>
      <p className="font-serif text-base font-bold text-gray-800">{label}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
    </div>
  </div>
);

const FeatureCard: FC<Feature> = ({ icon: Icon, label, desc }) => (
  <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-[#E8D9F5] bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F0E6FA] to-[#E0CCEF]">
      <Icon className="h-5 w-5 text-[#815AC0]" />
    </div>
    <p className="text-xs font-bold text-gray-800">{label}</p>
    <p className="text-[10px] leading-snug text-gray-400">{desc}</p>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const YaanaBreeze: FC = () => {
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getAbsoluteImageUrl = () => {
    if (typeof window === "undefined") return HERO_IMAGE_SRC;
    return new URL(HERO_IMAGE_SRC, window.location.origin).toString();
  };

  const getShareText = () => {
    if (typeof window === "undefined") return "Check out the Yaana Breeze poster";
    return `Check out Yaana Breeze: ${window.location.href}`;
  };

  const downloadPoster = async () => {
    if (typeof window === "undefined") return;

    try {
      const response = await fetch(HERO_IMAGE_SRC);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "yaana-breeze-poster.jpeg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = HERO_IMAGE_SRC;
      fallbackLink.download = "yaana-breeze-poster.jpeg";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
    }
  };

  const openShareWindow = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnWhatsApp = () => {
    const text = `${getShareText()} ${getAbsoluteImageUrl()}`;
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const shareOnFacebook = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getAbsoluteImageUrl())}`);
  };

  const shareOnInstagram = async () => {
    await downloadPoster();
    openShareWindow("https://www.instagram.com/");
  };

  return (
    <div className="min-h-screen bg-[#F7F1FB] font-sans text-gray-800">

      {/* ── Decorative top dots ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-32 h-64 w-64 rounded-full bg-[#C9A8E8]/20 blur-3xl" />
        <div className="absolute -right-16 top-64 h-56 w-56 rounded-full bg-[#B185DB]/15 blur-3xl" />
      </div>

      {/* ── SPACE FOR SITE HEADER ── */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="flex items-center justify-between rounded-full border border-[#E8D9F5] bg-white/82 px-4 py-3 shadow-lg shadow-[#815AC0]/8 backdrop-blur-md sm:px-5">
            <Link href="/yaana-breeze" className="min-w-0">
              <p className="font-serif text-lg font-bold leading-none text-[#3D1F6B] sm:text-xl">
                Yaana <span className="italic text-[#815AC0]">Breeze</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#815AC0]/70">
                Laundry Service
              </p>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DCC8EF] bg-white text-[#815AC0] shadow-sm transition-colors hover:bg-[#F7F1FB]"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="h-24 sm:h-28" aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#2A133F]/35"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 h-screen w-[85vw] max-w-96 overflow-y-auto bg-[#3D1F6B]/96 px-6 py-6 text-white shadow-xl backdrop-blur-md"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl font-bold">
                    Yaana <span className="italic text-[#D8B4F8]">Breeze</span>
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">
                    Quick Menu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-3">
                {BREEZE_NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/12"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-4 text-sm text-white/70">Contact us</p>
                <a
                  href="tel:1800-572-0709"
                  className="mb-2 block font-medium text-white/90 transition-colors hover:text-[#E9D5FF]"
                >
                  1800-572-0709
                </a>
                <a
                  href="mailto:info@yaanaliving.com"
                  className="block font-medium text-white/90 transition-colors hover:text-[#E9D5FF]"
                >
                  info@yaanaliving.com
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="relative mx-auto max-w-6xl space-y-10 px-4 pb-16 sm:px-6">

        {/* ── HERO ── */}
        <section className="overflow-hidden rounded-3xl border border-[#E8D9F5] bg-white/80 shadow-xl shadow-[#815AC0]/8 backdrop-blur-sm">
          <div className="grid items-center gap-0 lg:grid-cols-2">

            {/* Left: text */}
            <div className="space-y-5 p-7 sm:p-9 lg:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#815AC0]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#815AC0]">
                <Sparkles className="h-3 w-3" /> Exclusively for Yaana Girls
              </span>

              <div>
                <h1 className="font-serif text-4xl font-bold leading-tight text-[#3D1F6B] sm:text-5xl lg:text-[3.65rem]">
                  Yaana
                </h1>
                <h1 className="font-serif text-4xl font-bold italic leading-tight text-[#815AC0] sm:text-5xl lg:text-[3.65rem]">
                  Breeze
                </h1>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#815AC0]/70">
                  Laundry Service for the Girls of Yaana Groups
                </p>
                <p className="font-serif text-sm italic text-gray-500">
                  Because you deserve clean clothes and more free time. ♡
                </p>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                A thoughtfully designed laundry service—simple, reliable, and stress-free. We wash, dry, and iron so you can focus on what truly matters.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-[#815AC0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#815AC0]/30 transition-all hover:bg-[#6247AA] hover:shadow-[#6247AA]/30 active:scale-95"
                >
                  Start Laundry <ChevronRight className="h-4 w-4" />
                </button>
                <a
                  href="#details"
                  className="flex items-center gap-2 rounded-full border border-[#C4A8E8] bg-white px-6 py-2.5 text-sm font-semibold text-[#815AC0] transition-all hover:bg-[#F7F1FB] active:scale-95"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* Right: poster image */}
            <button
              type="button"
              onClick={() => setIsPosterOpen(true)}
              className="group relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#EDE0F7] via-[#E2CEEF] to-[#D4B8E8] text-left sm:min-h-[380px] lg:min-h-[470px]"
              aria-label="Open Yaana Breeze poster in larger view"
            >
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain object-center p-3 sm:p-4 lg:p-5"
                priority
              />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/88 px-3 py-1.5 text-xs font-semibold text-[#815AC0] shadow-md backdrop-blur-sm transition-transform group-hover:scale-[1.02]">
                <Expand className="h-3.5 w-3.5" />
                View larger
              </span>
              {/* subtle vignette on left edge for blend */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/20 to-transparent lg:block" />
            </button>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section>
          <SectionLabel text="How It Works" />
          <div className="mb-5 text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              We Wash. We Dry. We Iron.
            </h2>
            <p className="font-serif text-xl italic text-[#815AC0]">You Shine. ♡</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step) => <StepCard key={step.label} {...step} />)}
          </div>
        </section>

        {/* ── VALUE BANNER ── */}
        <section className="relative overflow-hidden rounded-3xl bg-[#3D1F6B] px-6 py-7 text-center shadow-xl shadow-[#3D1F6B]/25">
          {/* decorative dots */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 text-6xl select-none">✦</div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 text-6xl select-none">✦</div>
          <div className="relative">
            <p className="font-serif text-2xl font-semibold italic text-white sm:text-3xl">
              Sit back & relax,
            </p>
            <p className="mt-0.5 text-base font-medium text-white/80 sm:text-lg">
              We'll take care of the rest.
            </p>
            <div className="mt-1 text-white/40 text-sm">♡</div>
          </div>
        </section>

        {/* ── SERVICE DETAILS ── */}
        <section id="details" className="grid gap-4 sm:grid-cols-2">

          {/* Drop & Pickup */}
          <div className="rounded-3xl border border-[#E8D9F5] bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0E6FA]">
              <MapPin className="h-5 w-5 text-[#815AC0]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#815AC0]">Drop & Pick-up Centre</p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#3D1F6B]">Yaana Living</h3>
            <address className="mt-3 not-italic text-sm leading-relaxed text-gray-500">
              18, 1st Main Rd, Chikkamaranahalli,<br />
              M S R Nagar, Mathikere,<br />
              Bengaluru, Karnataka 560054
            </address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=18+1st+Main+Rd+Chikkamaranahalli+MSR+Nagar+Mathikere+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#815AC0] px-4 py-2 text-xs font-semibold text-[#815AC0] transition-all hover:bg-[#815AC0] hover:text-white"
            >
              Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E8D9F5] bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#815AC0] to-[#6247AA] shadow-lg shadow-[#815AC0]/30 text-white font-bold text-lg">
              ₹
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#815AC0]">Rate</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-serif text-6xl font-bold text-[#3D1F6B]">₹500</span>
              <span className="text-xl font-semibold text-gray-400">/ 5kg</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">Affordable. Transparent. Hassle-free.</p>
            <div className="mt-1 text-[#815AC0]/40 text-sm">♡</div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {PRICING_TAGS.map((tag) => (
                <span key={tag} className="rounded-full bg-[#F7F1FB] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#815AC0] border border-[#E8D9F5]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY YAANA BREEZE ── */}
        <section>
          <SectionLabel text="Why Yaana Breeze" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FEATURES.map((f) => <FeatureCard key={f.label} {...f} />)}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="rounded-3xl border border-[#E8D9F5] bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <SectionLabel text="About the Service" />
          <div className="mx-auto max-w-2xl space-y-3 text-center text-sm leading-relaxed text-gray-500">
            <p>Yaana Breeze is a thoughtfully designed laundry service created exclusively for the girls of Yaana, making everyday living simpler and more comfortable.</p>
            <p>Just drop off your clothes at Yaana Living, and they'll be professionally washed, carefully dried, and neatly ironed—ready for you to pick up fresh and hassle-free.</p>
            <p>
              Priced at{" "}
              <span className="font-semibold text-[#815AC0]">₹500 for 5 kg</span>
              , it's a convenient, reliable solution that saves time while ensuring your clothes are handled with care.
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="rounded-3xl border border-[#E8D9F5] bg-white/80 px-6 py-10 text-center shadow-sm backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#815AC0]">Ready to begin?</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Clean clothes. Clear mind.<br />
            <span className="text-[#815AC0] italic">Confident you.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-400">
            Join the Yaana girls who've made laundry the easiest part of their week. ♡
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#815AC0] px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-[#815AC0]/30 transition-all hover:bg-[#6247AA] hover:shadow-[#6247AA]/30 active:scale-95"
          >
            Get Started <ChevronRight className="h-4 w-4" />
          </button>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#E8D9F5] bg-[#3D1F6B] py-5 text-center">
        <p className="font-serif text-sm text-white/60">
          Yaana Groups &nbsp;|&nbsp; <span className="italic">Caring for you, every detail. ♡</span>
        </p>
      </footer>

      <Dialog open={isPosterOpen} onOpenChange={setIsPosterOpen}>
        <DialogContent
          onClose={() => setIsPosterOpen(false)}
          className="max-w-[min(96vw,980px)] border-white/10 bg-[#2A133F] p-3 text-white sm:p-4"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Yaana Breeze poster</DialogTitle>
            <DialogDescription>
              Enlarged Yaana Breeze poster with options to download it or share it on WhatsApp, Instagram, and Facebook.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative h-[68vh] w-full overflow-hidden rounded-2xl bg-white/6 sm:h-[74vh]">
              <Image
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 96vw, 980px"
                className="object-contain p-3 sm:p-4"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={downloadPoster}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#815AC0] transition-colors hover:bg-[#F3EAFE]"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={shareOnInstagram}
                className="inline-flex items-center gap-2 rounded-full bg-[#E1306C] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </button>
              <button
                type="button"
                onClick={shareOnFacebook}
                className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </button>
            </div>

            <p className="text-xs leading-relaxed text-white/65">
              Instagram does not support direct web image sharing, so that button downloads the poster first and then opens Instagram.
            </p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default YaanaBreeze;
