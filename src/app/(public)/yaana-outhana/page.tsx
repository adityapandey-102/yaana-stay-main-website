"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Clock3,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ScrollText,
  Soup,
  Sparkles,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "919844749685";
const PHONE_NUMBER = "9844749685";
const LOGO_SRC = "/assets/logos/yaana-outhana.jpeg";
const PAMPHLET_SRC = "/assets/yaana-outhana-pamphlet.jpeg";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#speciality", label: "Speciality" },
  { href: "#contact", label: "Contact" },
] as const;

const MENU_SECTIONS = [
  {
    title: "Tiffin Items",
    subtitle: "Breakfast classics prepared in a traditional South Indian style.",
    items: [
      "Rava Idly with Bombay Saagu & Chutney",
      "Idly, Vada with Sambar & Chutney",
      "Set Dosa with Saagu & Chutney",
      "Masala Dosa with Aloo Palya & Chutney",
      "Davangere Benne Dose with Aloo Palya & Chutney",
      "Poori with Saagu & Chutney",
      "Button Idly and Sambar Dip",
      "Thatte Idly with Sambar & Chutney",
    ],
  },
  {
    title: "Breakfast Menu",
    subtitle: "Morning selections for wholesome event catering and group orders.",
    items: [
      "Chow Chow Bath (Khara Bath + Kesari Bath) with Chutney",
      "Shavige Bath with Chutney",
      "Pongal with Raita and Chutney",
      "Sweet Pongal",
      "Avalakki (Poha) with Chutney",
      "Vangi Upma with Chutney",
    ],
  },
  {
    title: "Welcome Drinks / Juices",
    subtitle: "Refreshing starters for festive arrivals and function service.",
    items: [
      "Watermelon Juice",
      "Musk Melon Juice",
      "Pineapple Juice",
      "Orange Juice",
      "Masala Soda",
      "Raw Mango Shots",
      "Fruit Punch",
      "Lemon Pudina Refresher",
      "Lassi / Buttermilk",
    ],
  },
  {
    title: "Soups",
    subtitle: "Light and comforting bowls to begin the meal service.",
    items: [
      "Tomato Soup",
      "Sweet Corn Soup",
      "Hot & Sour Soup",
      "Vegetable Clear Soup",
      "Manchow Soup",
    ],
  },
  {
    title: "Appetizers",
    subtitle: "Crisp, festive starters for celebrations and family occasions.",
    items: [
      "Aloo Bonda",
      "Mirchi Bajji",
      "Mangalore Bajji",
      "Baby Corn Fry",
      "Lemon Paneer",
      "Veg Cutlet",
      "Gobi 65",
      "Dahi Vada",
      "Jackfruit Kebab",
      "Veg / Onion Pakoda",
    ],
  },
  {
    title: "Chats",
    subtitle: "Street-style favorites brought into a curated kitchen menu.",
    items: [
      "Masala Puri",
      "Papdi Chaat",
      "Sev / Aloo Puri",
      "Bhel Puri",
      "Bombay Pani Puri",
      "Aloo Tikki Chole",
    ],
  },
  {
    title: "Salads",
    subtitle: "Fresh accompaniments that balance the richness of the feast.",
    items: [
      "Kosambari",
      "Cucumber Pomegranate Salad",
      "Sprouts Salad",
      "Fresh Vegetable Salad",
      "Corn & Capsicum Salad",
      "Peanut Masala Salad",
    ],
  },
  {
    title: "Rice Varieties",
    subtitle: "Comforting staples and festive rice dishes for full-service menus.",
    items: [
      "Vangi Bath",
      "Bisibele Bath",
      "Puliyogare",
      "Vegetable Pulav",
      "Green Peas Pulav",
      "Vegetable Biryani",
      "Mushroom Biryani",
      "Jackfruit Biryani",
      "Ghee Rice",
      "Jeera Rice",
      "Lemon Rice",
      "Coconut Rice",
      "Tomato Bath",
      "Steamed Rice",
    ],
  },
  {
    title: "Palya (Dry Vegetable Dishes)",
    subtitle: "Traditional dry sides with homestyle seasoning and texture.",
    items: [
      "Beans Palya",
      "Beetroot Palya",
      "Cabbage Carrot Palya",
      "Mixed Vegetable Palya",
      "Aloo and Peas Palya",
      "Pulses Palya",
      "Bindi Sukka",
      "Brinjal Sukka",
      "Tondekaayi Sukka / Kabul",
      "Aloo Kaju Matar Palya",
      "Thondekayi Kaju Palya",
      "Channa Palya",
    ],
  },
  {
    title: "Curries (Gravies)",
    subtitle: "Signature gravies suited for weddings, poojas, and celebrations.",
    items: [
      "Vegetable Kurma",
      "Bombay Saagu",
      "Yennegai (Stuffed Brinjal Curry)",
      "Paneer Butter Masala",
      "Mixed Vegetable Curry",
      "Chole Masala",
    ],
  },
  {
    title: "Dals",
    subtitle: "Soulful lentil-based dishes rooted in regional tradition.",
    items: [
      "Dal Fry",
      "Tadka Dal",
      "Tomato Dal",
      "Moong Dal",
      "Palak Pappu",
      "Sambar",
      "Vegetable Sambar",
      "Drumstick Sambar",
      "Ladies Finger / Radish Sambar",
      "Mixed Dal Sambar",
      "Malenadu Huralikattu",
    ],
  },
  {
    title: "Rasam",
    subtitle: "Aromatic, comforting pours that complete a proper feast.",
    items: [
      "Pepper Rasam",
      "Lemon Rasam",
      "Tomato Rasam",
      "Mysore Rasam",
      "Mango Rasam",
    ],
  },
  {
    title: "Chutneys",
    subtitle: "Classic accompaniments made to complement breakfast and snacks.",
    items: [
      "Coconut Chutney",
      "Tomato Chutney",
      "Mint Chutney",
      "Onion Chutney",
      "Shenga (Peanut) Chutney",
    ],
  },
  {
    title: "Gojju (Traditional Specialty)",
    subtitle: "Sweet-tangy regional specialties for elevated traditional menus.",
    items: [
      "Pineapple Gojju",
      "Dry Grapes (Kismis) Gojju",
    ],
  },
  {
    title: "Roti & Dosa Counter",
    subtitle: "Live-counter favorites for larger gatherings and custom events.",
    items: [
      "Methi Chapati",
      "Masala Rotti",
      "Jowar Rotti",
      "Palak Pulka / Butter Pulka",
      "Bhatura / Poori",
      "Set Dosa with Chutney",
      "Masala Dosa with Chutney",
      "Davangere Benne Dose with Chutney",
      "Bili Holige",
      "Pudi Masala Dosa",
    ],
  },
  {
    title: "Sweets & Desserts",
    subtitle: "Celebration sweets that carry warmth, memory, and hospitality.",
    items: [
      "Gulab Jamun",
      "Kesaribath",
      "Laddoo",
      "Hesaru Bele Payasa",
      "Sabakki Shavige Payasa",
      "Kayi / Bele Holige",
      "Mysore Pak",
      "Carrot Halwa",
      "Badam Kheer",
      "Gasagase Payasa",
      "Chiroti",
      "Hot Badam Milk with Laddoo",
    ],
  },
] as const;

const SERVICE_HIGHLIGHTS = [
  "Authentic South Indian cuisine",
  "Customized menus for every occasion",
  "Fresh ingredients and traditional recipes",
  "Ideal for weddings, poojas, festivals, and family gatherings",
] as const;

const DINING_ESSENTIALS = [
  "Drinking Water",
  "Tissue Paper",
  "Finger Bowl",
  "Tamboola",
] as const;

function buildWhatsAppLink(item: string, category: string) {
  const text = `Namaskara, I would like to enquire about "${item}" from the ${category} menu at Yaana Outhana. Please share more details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function YaanaOuthanaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([
    "Tiffin Items",
    "Rice Varieties",
    "Sweets & Desserts",
  ]);

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
                Yaana Outhana
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
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
            onClick={() => setMenuOpen(true)}
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
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[84vw] max-w-sm flex-col bg-[#5a2316] px-6 py-6 text-[#f8ecd8]"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-serif text-2xl font-semibold">Yaana Outhana</p>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
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
                    onClick={() => setMenuOpen(false)}
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
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
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

      <main>
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
                  Yaana
                  <span className="block text-[#8f5a22]">Outhana</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#6f4732]">
                  A commercial kitchen menu page inspired directly by your traditional
                  flyer design, crafted for professional enquiries, event catering,
                  festive dining, and authentic South Indian celebrations.
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
                    Tap any dish to message the kitchen
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
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
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

        <section id="about" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#fff9ef]/85 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5a22]">
                Bringing Tradition To Your Table
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#5a2316] sm:text-4xl">
                Traditional catering presentation with a modern enquiry flow
              </h2>
              <p className="mt-4 text-base leading-8 text-[#6f4732]">
                Yaana Outhana is presented here as a refined kitchen menu experience:
                traditional in mood, festive in palette, and practical for business
                enquiries. Each category opens like a menu counter, and every dish can
                be tapped to send a direct WhatsApp enquiry to the kitchen team.
              </p>
            </div>

            <div
              id="speciality"
              className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#5a2316] p-8 text-[#f8ecd8] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Leaf className="h-5 w-5 text-[#d7b16d]" />
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d7b16d]">
                  Kitchen Highlights
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

        <section id="menu" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5a22]">
              Commercial Kitchen Menu
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5a2316] sm:text-5xl">
              Explore the menu by variety
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#6f4732]">
              Open any variety below, browse the listed dishes, and tap a dish name to
              create a prefilled WhatsApp enquiry. This page intentionally does not show
              any price tags.
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
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
                    aria-expanded={isOpen}
                  >
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
                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {section.items.map((item) => (
                              <a
                                key={item}
                                href={buildWhatsAppLink(item, section.title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-[#b78237]/15 bg-white/80 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#8f5a22]/35 hover:bg-white"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-base font-semibold leading-7 text-[#5a2316]">
                                      {item}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8f5a22]">
                                      Tap to enquire on WhatsApp
                                    </p>
                                  </div>
                                  <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-[#8f5a22] transition group-hover:scale-110" />
                                </div>
                              </a>
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

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[#fff9ef]/85 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#8f5a22]">
                <Soup className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.28em]">
                  Dining Essentials
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {DINING_ESSENTIALS.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#b78237]/15 bg-white/75 px-4 py-4 text-sm font-medium text-[#5a2316]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#8f5a22]/15 bg-[linear-gradient(135deg,#5a2316,#7c4d1e)] p-8 text-[#f8ecd8] shadow-sm">
              <div className="flex items-center gap-3 text-[#e3c17d]">
                <ScrollText className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.28em]">
                  Service Note
                </p>
              </div>
              <p className="mt-5 text-base leading-8 text-[#f3e4ca]">
                The uploaded PDF also includes pricing and custom package structures,
                but this web page is intentionally designed without any price display.
                It focuses purely on menu browsing and quick lead generation through
                WhatsApp enquiries for each item.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="mt-10 border-t border-[#7b4a1d]/15 bg-[#4a1d13] text-[#f8ecd8]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b16d]">
              Yaana Outhana
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Traditional kitchen enquiries, made simple
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#ecd9bc]">
              Browse the menu, tap any dish, and connect directly with the kitchen on
              WhatsApp for event, festive, and function enquiries.
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d7b16d]" />
              <p className="text-sm leading-7 text-[#f4e7d3]">
                18, 1st Main Rd, Chikkamaranahalli, M S R Nagar, Mathikere,
                Bengaluru, Karnataka 560054
              </p>
            </div>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-3 text-sm font-medium text-[#f8ecd8]"
            >
              <Phone className="h-4 w-4 text-[#d7b16d]" />
              {PHONE_NUMBER}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b16d] px-5 py-3 text-sm font-semibold text-[#4a1d13] transition hover:bg-[#ebc985]"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp Enquiry
            </a>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#d7b16d]">
              <Clock3 className="h-4 w-4" />
              No prices shown on this page
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
