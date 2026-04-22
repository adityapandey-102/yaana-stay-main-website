"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetInTouchModal } from "@/components/modals/GetInTouchModal";
import { CONTACT } from "@/data/contact";
import { useState } from "react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497512.2830427995!2d77.461098!3d12.971599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6b%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1";

const INFO = [
  { icon: Phone, label: "Phone", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: MapPin, label: "Location", value: CONTACT.location },
  { icon: Clock, label: "Working Time", value: CONTACT.workingTime },
];

export function ContactPageContent({ mapUrl }: { mapUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Contact card */}
          <div className="bg-white rounded-card shadow-lg p-6 sm:p-8 lg:p-10 order-2 lg:order-1 flex flex-col justify-between">

            {/* Top Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal mb-3">
                CONTACT US
              </h2>

              <div className="w-12 h-[2px] bg-yaana-charcoal mb-6" />

              <p className="text-yaana-charcoal/80 leading-relaxed text-sm sm:text-base mb-10">
               Ready to experience YAANA? Contact us today and let&apos;s get you started.

              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                {INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-btn bg-yaana-charcoal/5 flex items-center justify-center transition hover:bg-yaana-charcoal/10">
                      <Icon className="w-5 h-5 text-yaana-charcoal" />
                    </div>

                    {/* Text */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-yaana-charcoal uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-sm text-yaana-charcoal/90 break-words leading-snug">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="mt-12">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8"
                onClick={() => setOpen(true)}
              >
                Get in touch with us
              </Button>
            </div>
          </div>


          {/* Right: Map */}
          <div className="rounded-card overflow-hidden h-[300px] lg:h-[400px] lg:min-h-[380px] order-1 lg:order-2">
            <iframe
              src={mapUrl ?? MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
        </div>
      </div>
      <GetInTouchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

