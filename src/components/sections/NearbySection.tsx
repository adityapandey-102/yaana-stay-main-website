"use client";

import type { CSSProperties, ComponentType } from "react";
import { useState } from "react";
import {
  ArrowUpRight, BriefcaseBusiness, Bus, GraduationCap,
  HeartPulse, Landmark, MapPin, ShieldCheck, ShoppingBag, Train,
} from "lucide-react";
import { SectionFade } from "@/components/ui/section-fade";
import { cn } from "@/lib/utils";

type LandmarkCategory = "education" | "health" | "transit" | "institution" | "safety" | "lifestyle" | "work";

const properties = [
  { id: "signature", shortName: "Signature", name: "YAANA SIGNATURE", address: "New No. 2, Jaladarshini Layout, Near Ramaiah College Gate 4, Bengaluru 560065", price: "₹12,000/mo", accent: "#815AC0", coords: { x: 48, y: 44 } },
  { id: "living", shortName: "Living", name: "YAANA LIVING", address: "18, 1st Main Rd, M.S.R. Nagar, Mathikere, Bengaluru 560054", price: "₹7,000/mo", accent: "#9163CB", coords: { x: 38, y: 56 } },
  { id: "comforts", shortName: "Comforts", name: "YAANA COMFORTS", address: "41, 5th Main Rd, Off New BEL Road, Amarjyothi Layout, Bengaluru 560094", price: "₹11,000/mo", accent: "#6247AA", coords: { x: 28, y: 36 } },
  { id: "homes", shortName: "Homes", name: "YAANA HOMES", address: "21, MSR Nagar Road Extension, Pipeline Road, Mathikere, Bengaluru 560054", price: "₹8,000/mo", accent: "#A06CD5", coords: { x: 58, y: 62 } },
];

const categoryMeta: Record<LandmarkCategory, { label: string; color: string }> = {
  education: { label: "Education", color: "#6247AA" },
  health: { label: "Healthcare", color: "#9163CB" },
  transit: { label: "Transit", color: "#A06CD5" },
  institution: { label: "Institution", color: "#815AC0" },
  safety: { label: "Safety", color: "#7251B5" },
  lifestyle: { label: "Lifestyle", color: "#B185DB" },
  work: { label: "Work", color: "#9163CB" },
};

const landmarks: { name: string; distance: string; category: LandmarkCategory; icon: ComponentType<{ className?: string; style?: CSSProperties }>; coords: { x: number; y: number }; note: string }[] = [
  { name: "Ramaiah University", distance: "550m", category: "education", icon: GraduationCap, coords: { x: 52, y: 38 }, note: "Quick campus access" },
  { name: "Ramaiah Hospital", distance: "550m", category: "health", icon: HeartPulse, coords: { x: 44, y: 38 }, note: "Major healthcare support" },
  { name: "Devsandra Bus Stop", distance: "450m", category: "transit", icon: Bus, coords: { x: 48, y: 52 }, note: "Local commute hub" },
  { name: "ISRO", distance: "900m", category: "institution", icon: Landmark, coords: { x: 34, y: 48 }, note: "Institutional corridor" },
  { name: "IISc", distance: "2.8km", category: "education", icon: GraduationCap, coords: { x: 22, y: 66 }, note: "Research & academia" },
  { name: "Sadashivanagar PS", distance: "2.4km", category: "safety", icon: ShieldCheck, coords: { x: 68, y: 30 }, note: "Neighbourhood security" },
  { name: "Yeshwanthpur Metro", distance: "3.2km", category: "transit", icon: Train, coords: { x: 18, y: 76 }, note: "City metro access" },
  { name: "Orion Mall", distance: "3.6km", category: "lifestyle", icon: ShoppingBag, coords: { x: 74, y: 70 }, note: "Shopping & dining" },
  { name: "Malleshwaram", distance: "6.2km", category: "lifestyle", icon: MapPin, coords: { x: 80, y: 42 }, note: "Cafes & errands" },
  { name: "Manyata Tech Park", distance: "8.5km", category: "work", icon: BriefcaseBusiness, coords: { x: 76, y: 18 }, note: "Major work hub" },
];

const distVal = (d: string) => { const v = parseFloat(d); return d.includes("km") ? v * 1000 : v; };

export default function NearbySection() {
  const [activeProp, setActiveProp] = useState(properties[0].id);
  const [activeCat, setActiveCat] = useState<LandmarkCategory | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const sel = properties.find((p) => p.id === activeProp)!;
  const cats = Array.from(new Set(landmarks.map((l) => l.category)));
  const filtered = (activeCat ? landmarks.filter((l) => l.category === activeCat) : landmarks)
    .sort((a, b) => distVal(a.distance) - distVal(b.distance));
  const visibleNames = new Set(filtered.map((l) => l.name));
  const highlighted = filtered.find((l) => l.name === hovered) ?? filtered[0];

  return (
    <section className="relative overflow-hidden bg-lavender-50 py-14 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,183,229,0.4),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(145,99,203,0.14),transparent_30%)]" />

      <SectionFade className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-lavender-700">Neighbourhood</p>
          <h2 className="mt-2 text-2xl font-serif font-bold text-yaana-nearblack md:text-3xl lg:text-4xl">Around every YAANA stay</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          {/* MAP PANEL */}
          <div className="rounded-2xl border border-lavender-200/80 bg-white/85 p-3 shadow-[0_16px_60px_rgba(95,63,135,0.11)] backdrop-blur">
            {/* Property tabs */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {properties.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProp(p.id)}
                  className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                  style={{
                    borderColor: p.id === activeProp ? p.accent : "#DDD3EC",
                    backgroundColor: p.id === activeProp ? p.accent : "#fff",
                    color: p.id === activeProp ? "#fff" : p.accent,
                  }}
                >
                  {p.shortName}
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="relative overflow-hidden rounded-xl border border-lavender-100 bg-[#f5eff9]" style={{ height: 420 }}>
              {/* Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(129,90,192,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(129,90,192,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
              {/* Roads */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(160,108,213,0.1)" strokeWidth="14" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(160,108,213,0.1)" strokeWidth="14" />
                <line x1="6%" y1="22%" x2="60%" y2="36%" stroke="rgba(160,108,213,0.07)" strokeWidth="9" />
                <line x1="20%" y1="62%" x2="80%" y2="80%" stroke="rgba(160,108,213,0.07)" strokeWidth="9" />
              </svg>
              {/* Area labels */}
              {[{ t: "BEL Road", x: 20, y: 18 }, { t: "MSR Nagar", x: 62, y: 55 }, { t: "Campus Zone", x: 50, y: 14 }].map((l) => (
                <span key={l.t} className="absolute text-[9px] font-semibold uppercase tracking-[0.22em] text-lavender-400/60" style={{ left: `${l.x}%`, top: `${l.y}%`, transform: "translate(-50%,-50%)" }}>{l.t}</span>
              ))}

              {/* Landmark pins */}
              {landmarks.map((lm) => {
                const meta = categoryMeta[lm.category];
                const Icon = lm.icon;
                const vis = visibleNames.has(lm.name);
                const isH = hovered === lm.name;
                return (
                  <button
                    key={lm.name}
                    type="button"
                    onMouseEnter={() => setHovered(lm.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity"
                    style={{ left: `${lm.coords.x}%`, top: `${lm.coords.y}%`, opacity: vis ? 1 : 0.18 }}
                    aria-label={lm.name}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white transition-transform"
                      style={{
                        transform: isH ? "scale(1.2)" : "scale(1)",
                        boxShadow: isH ? `0 8px 24px ${meta.color}50` : `0 3px 12px ${meta.color}28`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: meta.color }} />
                    </span>
                    {isH && vis && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/80 bg-white/97 px-2.5 py-1.5 text-left shadow-lg">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: meta.color }}>{meta.label}</span>
                        <span className="block text-xs font-semibold text-yaana-nearblack">{lm.name}</span>
                        <span className="block text-[10px] text-yaana-charcoal/60">{lm.distance}</span>
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Property pins */}
              {properties.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProp(p.id)}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                  aria-label={p.name}
                >
                  <span
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-white shadow-lg transition-transform"
                    style={{
                      backgroundColor: p.accent,
                      transform: p.id === activeProp ? "scale(1.15)" : "scale(1)",
                      boxShadow: p.id === activeProp ? `0 0 0 8px ${p.accent}22, 0 8px 24px ${p.accent}44` : `0 4px 14px ${p.accent}44`,
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </button>
              ))}

              {/* Info bar at bottom of map */}
              {highlighted && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl border border-white/70 bg-white/93 px-4 py-2.5 shadow-lg backdrop-blur">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${categoryMeta[highlighted.category].color}18` }}>
                    <highlighted.icon className="h-4 w-4" style={{ color: categoryMeta[highlighted.category].color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: categoryMeta[highlighted.category].color }}>{categoryMeta[highlighted.category].label}</p>
                    <p className="text-sm font-semibold text-yaana-nearblack truncate">{highlighted.name}</p>
                  </div>
                  <span className="text-sm font-bold text-lavender-700 shrink-0">{highlighted.distance}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-3">
            {/* Property card */}
            <div className="rounded-2xl border p-4 shadow-[0_8px_32px_rgba(95,63,135,0.1)]" style={{ borderColor: `${sel.accent}33`, background: `linear-gradient(135deg,${sel.accent}10,#fff)` }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: sel.accent }}>Selected</p>
              <h3 className="mt-1 text-base font-serif font-bold text-yaana-nearblack">{sel.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-yaana-charcoal/65">{sel.address}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: sel.accent }}>{sel.price}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: sel.accent }}
                >
                  Maps <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-lavender-200/80 bg-white/90 p-4 shadow-[0_8px_32px_rgba(95,63,135,0.08)]">
              <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.3em] text-lavender-700">Filter</p>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" onClick={() => setActiveCat(null)} className={cn("rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] transition-colors", activeCat === null ? "border-lavender-700 bg-lavender-700 text-white" : "border-lavender-200 bg-white text-lavender-600 hover:border-lavender-400")}>All</button>
                {cats.map((cat) => {
                  const meta = categoryMeta[cat];
                  const on = activeCat === cat;
                  return (
                    <button key={cat} type="button" onClick={() => setActiveCat(on ? null : cat)} className="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] transition-colors" style={{ borderColor: on ? meta.color : "#E3D8EE", backgroundColor: on ? meta.color : "#fff", color: on ? "#fff" : meta.color }}>
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Landmark list */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-lavender-200/80 bg-white/90 shadow-[0_8px_32px_rgba(95,63,135,0.08)]" style={{ maxHeight: 260 }}>
              {filtered.map((lm, i) => {
                const meta = categoryMeta[lm.category];
                const isH = hovered === lm.name;
                return (
                  <div
                    key={lm.name}
                    onMouseEnter={() => setHovered(lm.name)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn("flex cursor-pointer items-center gap-2.5 px-4 py-2.5 transition-colors", i !== filtered.length - 1 && "border-b border-lavender-100")}
                    style={{ backgroundColor: isH ? `${meta.color}0c` : undefined }}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${meta.color}16` }}>
                      <lm.icon className="h-3.5 w-3.5" style={{ color: meta.color }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-yaana-nearblack truncate">{lm.name}</p>
                      <p className="text-[10px] text-yaana-charcoal/50">{meta.label}</p>
                    </div>
                    <span className="text-xs font-bold shrink-0" style={{ color: meta.color }}>{lm.distance}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionFade>
    </section>
  );
}
