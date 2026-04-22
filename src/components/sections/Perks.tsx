"use client";

import { SectionFade } from "@/components/ui/section-fade";

import {
  Dumbbell,
  ChefHat,
  KeyRound,
  Utensils,
  UserCheck,
  Users,
  Bath,
  Archive,
  Table,
  Tv,
  Sparkles,
  Droplets
} from "lucide-react";


const AMENITIES = [
  {
    title: "GYM",
    icon: Dumbbell,
    desc: "Stay fit with premium equipment and training"
  },
  {
    title: "Self cooking kitchen",
    icon: ChefHat,
    desc: "Cook the way you like with our convenient self-cooking kitchen facility."
  },
  {
    title: "RFID IN ALL ROOMS",
    icon: KeyRound,
    desc: "Secure keyless entry with advanced RFID technology"
  },
  {
    title: "5-STAR DINING EXPERIENCE",
    icon: Utensils,
    desc: "Enjoy gourmet meals prepared by professional chefs"
  },
  {
    title: "CONCIERGE",
    icon: UserCheck,
    desc: "24/7 dedicated assistance for all your needs"
  },
  {
    title: "PERSONAL BUTLER",
    icon: Users,
    desc: "Premium personalized service at your doorstep"
  },
  {
    title: "Attached Western Bathroom",
    icon: Bath,
    desc: "Designed for comfort with a private attached western bathroom in every room."
  },
  {
    title: "Personal Cupboard",
    icon: Archive,
    desc: "Spacious personal cupboards for smart and secure storage."
  },
  {
    title: "Study Table",
    icon: Table,
    desc: "Study smarter with a personal study table built for focus and efficiency."
  },
  {
    title: "TV",
    icon: Tv,
    desc: "Relax and unwind with high-quality television entertainment in every room."
  },
  {
    title: "Dressing Table",
    icon: Sparkles,
    desc: "Start your day with ease using a stylish and functional in-room dressing table."
  },
  {
    title: "RO Water",
    icon: Droplets,
    desc: "Drink safe with advanced RO purified water available round the clock."
  }
];

export function Perks() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br   from-purple-200 via-purple-400   to-yaana-dark-lavender/70">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            EXCLUSIVE AMENITIES
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            {/* At YAANA, experience modern living designed with luxury and convenience in mind. From high-speed Wi-Fi and 24/7 security to thoughtfully designed common spaces and vibrant community events, every detail is crafted to offer comfort, style, and a seamless living experience. */}
            Everything you need for a comfortable and connected lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="flex flex-col items-center text-center space-y-3 py-3 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-lavender-300/80 hover:bg-lavender-600"
              >
                <div className="w-14 h-14 rounded-full border border-lavender-200 bg-white flex items-center justify-center">
                  <Icon className="w-6 h-6 text-lavender-700" />
                </div>
                <span className="text-yaana-nearblack text-xs sm:text-sm uppercase tracking-wider">
                  {amenity.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="group bg-white rounded-card p-6 border border-lavender-200 hover:border-lavender-400 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-lavender-600/10 mb-4 group-hover:bg-lavender-600/20 transition-colors">
                  <Icon className="w-7 h-7 text-lavender-700" />
                </div>
                <h3 className="font-serif font-bold text-sm text-yaana-nearblack mb-2 uppercase tracking-wider leading-tight">{amenity.title}</h3>
                <p className="text-xs text-yaana-charcoal leading-relaxed">{amenity.desc}</p>
              </div>
            );
          })}
        </div> */}
      </SectionFade>
    </section>
  );
}
