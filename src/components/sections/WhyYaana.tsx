"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";
import { LavenderWallpaper } from "../decor/LavenderWallpaper";

const STATS = [
  { value: "4", label: "PROPERTIES" },
  { value: "800+", label: "BEDS" },
  { value: "1000+", label: "REVIEWS" },
  { value: "3000+", label: "CLIENTS" },
];

export function WhyYaana() {
  return (
    <section className="relative bg-white-- py-20 lg:py-28">
      <LavenderWallpaper />
      <SectionFade className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="relative overflow-hidden -rounded-[2rem] border border-lavender-200/80 bg-white/80 -p-3 shadow-[0_24px_80px_rgba(95,63,135,0.14)] backdrop-blur">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-lavender-100/70 via-white/30 to-lavender-200/40" /> */}
            <div className="relative overflow-hidden -rounded-[1.6rem]">
              <Image
                src="/assets/founders.jpeg"
                alt="Divya Prasad, Founder and Proprietrix of YAANA Group"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-yaana-nearblack/25 via-transparent to-white/10" />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lavender-700">
              Founder&apos;s Desk
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold tracking-tight text-yaana-nearblack md:text-4xl lg:text-5xl">
              A home built on safety, dignity, and care
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base italic leading-relaxed text-yaana-charcoal md:text-lg lg:mx-0">
              &ldquo;YAANA Group was founded with one thought - no women should
              ever feel unsafe or lonely while living away from home. Over the
              last decade, we&apos;ve served thousands of young women, offering
              them a caring environment where safety meets comfort. At YAANA,
              you&apos;re not just renting a room you&apos;re joining a
              family.&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-yaana-charcoal/80 md:text-base">
              Divya Prasad
            </p>
            <p className="mt-1 text-sm italic text-yaana-charcoal/75 md:text-base">
              Founder and Proprietrix, YAANA Group
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block rounded-full bg-lavender-700 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-lavender-800"
              >
                Discover more about us
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="mb-2 text-4xl font-serif font-bold text-black lg:text-5xl xl:text-6xl">
                {s.value}
              </p>
              <p className="text-xs font-medium uppercase tracking-luxury text-yaana-charcoal/70 lg:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </SectionFade>
    </section>
  );
}
