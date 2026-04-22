"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Facebook, MessageCircle, Share2 } from "lucide-react";

type Props = {
  url: string;
  title: string;
};

export function PropertyShareButtons({ url, title }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setOpen(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        // className="inline-flex items-center gap-1 text-yaana-charcoal/70 hover:text-yaana-charcoal"

         className="inline-flex items-center justify-center rounded-btn bg-yaana-charcoal px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-yaana-charcoal/90"
      >
        <Share2 className="w-4 h-4 mr-1" /> Share
      </button>

      {open && (
        <div className="absolute  mt-2 z-30 rounded-lg border border-lavender-200 bg-white shadow-md p-2">
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-yaana-charcoal/80 hover:text-yaana-charcoal px-2 py-1 rounded hover:bg-yaana-charcoal/5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-yaana-charcoal/80 hover:text-yaana-charcoal px-2 py-1 rounded hover:bg-yaana-charcoal/5"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs text-yaana-charcoal/80 hover:text-yaana-charcoal px-2 py-1 rounded hover:bg-yaana-charcoal/5"
            >
              <Copy className="w-4 h-4" /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
