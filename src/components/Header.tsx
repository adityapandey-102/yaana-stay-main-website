"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "./modals/ScheduleVisitModal";
// import { GetInTouchModal } from "@/components/modals/GetInTouchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/life-at-yaana", label: "Life @  YAANA" },
  { href: "/about", label: "About Us" },
  { href: "/rental", label: "Properties" },
  { href: "/yaana-breeze", label: "Yaana Breeze" },
  { href: "/contact", label: "Contact Us" },
];

const DEFAULT_LOGO = "/assets/logos/yaana.jpeg";

function getHeaderLogo(pathname: string) {
  if (pathname.startsWith("/property-details/YAANA-COMFORTS")) {
    return "/assets/logos/yaana-comfort.jpeg";
  }

  if (pathname.startsWith("/property-details/YAANA-HOMES")) {
    return "/assets/logos/yaana-homes.jpeg";
  }

  if (pathname.startsWith("/property-details/YAANA-LIVING")) {
    return "/assets/logos/yaana-living.jpeg";
  }

  if (pathname.startsWith("/property-details/YAANA-SIGNATURE")) {
    return "/assets/logos/yaana-signature.jpeg";
  }

  return DEFAULT_LOGO;
}

export function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerLogo = getHeaderLogo(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/yaana-breeze") {
    return null;
  }

  return (
    <>
      <header
        className={`
          sticky-- fixed top-0 z-50 transition-all w-full duration-300
          ${isScrolled
            ? "bg-white text-black shadow-md"
            : "bg-transparent  text-white"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link href="/" aria-label="YAANA home">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-- border-white/30- bg-white shadow-sm transition-all duration-300 lg:h-14 lg:w-14">
                  <Image
                    src={headerLogo}
                    alt="YAANA logo"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              {isScrolled && (
                <Button
                  size="sm"
                  onClick={() => setScheduleVisitOpen(true)}
                  className={`
                    hover:bg-lavender-700 hover:text-white uppercase text-xs font-semibold tracking-wide
                    ${isScrolled
                      ? "bg-lavender-600 text-white "
                      : "bg-lavender-600 text-white"}
                  `}
                >
                  Schedule a Visit
                </Button>
              )}
              <Button
                variant="ghost"
                size="lg"
                className={`p-2 ${isScrolled
                  ? "text-yaana-charcoal"
                  : "text-white"} hover:text-lavender-700 hover:bg-white/10`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-[85vw] max-w-96 bg-yaana-nearblack-- bg-black/70 text-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-white hover:text-lavender-200 hover:bg-white/10"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className="block py-3 px-4 font-medium text-white/90 hover:text-lavender-200 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/70 mb-4">Contact us</p>
                  <a
                    href="tel:1800-572-0709"
                    className="block text-white/90 hover:text-lavender-200 transition-colors mb-2 font-medium"
                  >
                    1800-572-0709
                  </a>
                  <a
                    href="mailto:info@yaanaliving.com"
                    className="block text-white/90 hover:text-lavender-200 transition-colors font-medium"
                  >
                    info@yaanaliving.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* <GetInTouchModal open={scheduleVisitOpen} onClose={() => setScheduleVisitOpen(false)} /> */}
      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onClose={() => setScheduleVisitOpen(false)}
      />
    </>
  );
}
