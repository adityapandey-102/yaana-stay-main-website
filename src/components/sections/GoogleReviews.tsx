"use client";

import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEW_IMAGES = [
  "/assets/reviews/review1.jpeg",
  "/assets/reviews/review2.jpeg",
  "/assets/reviews/review3.jpeg",
  "/assets/reviews/review4.jpeg",
  "/assets/reviews/review5.jpeg",
];

export function GoogleReviews() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-yaana-lavender/10 to-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-yaana-dark-lavender/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-yaana-dark-lavender">
            Google Reviews
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack tracking-tight">
            Loved By Girls & Their Parents
          </h2>
          <p className="max-w-3xl mt-4 text-base md:text-lg text-yaana-charcoal leading-relaxed">
            Real feedback from our community, captured as screenshots from Google reviews.
          </p>
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          autoplayDuration={5000}
          pauseOnHover
          className="relative"
        >
          <CarouselContent className="-ml-4 w-full">
            {REVIEW_IMAGES.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 basis-[100%] md:basis-[85%] lg:basis-[70%]"
              >
                <div className="group relative w-full rounded-card overflow-hidden bg-white shadow-lg ring-1 ring-yaana-dark-lavender/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                  <Image
                    src={img}
                    alt={` YAANA review ${idx + 1}`}
                    width={1505}
                    height={471}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
                    className="w-full h-auto object-contain bg-white"
                  />

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6" />
          <CarouselNext className="-right-4 md:-right-6" />
        </Carousel>
      </SectionFade>
    </section>
  );
}
