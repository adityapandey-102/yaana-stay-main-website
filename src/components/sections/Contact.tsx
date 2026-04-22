"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SectionFade } from "@/components/ui/section-fade";
import { Button } from "@/components/ui/button";
import { GetInTouchModal } from "../modals/GetInTouchModal";
import { useState } from "react";
import { CONTACT } from "@/data/contact";
import { LavenderWallpaper } from "../decor/LavenderWallpaper";

const INFO = [
  { icon: Phone, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: "Location", value: CONTACT.location, href: "#" },
  { icon: Clock, label: "Working Time", value: CONTACT.workingTime, href: "#" },
];

export function Contact() {
  const [getInTouchOpen, setGetInTouchOpen] = useState(false);

  return (
    <section className="relative py-20 lg:py-28 bg-lavender-50--" id="contact">
      <LavenderWallpaper/>
      <SectionFade className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            CONTACT US
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            Ready to experience YAANA? Contact us today and let&apos;s get you started.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INFO.map(({ icon: Icon, label, value, href }) => (
            <div 
              key={label} 
              className="bg-white rounded-card p-6 border border-lavender-200 hover:border-lavender-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-lavender-600/10 mx-auto mb-4">
                <Icon className="w-6 h-6 text-lavender-700" />
              </div>
              <p className="text-xs font-bold text-yaana-charcoal uppercase tracking-wider mb-2 text-center">{label}</p>
              <a
                href={href}
                className="text-sm text-yaana-charcoal/80 hover:text-lavender-700 transition block text-center leading-relaxed"
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="gold" onClick={() => setGetInTouchOpen(true)}>
            Get in touch with us!
          </Button>
        </div>
      </SectionFade>
      <GetInTouchModal open={getInTouchOpen} onClose={() => setGetInTouchOpen(false)} />
    </section>
  );
}

