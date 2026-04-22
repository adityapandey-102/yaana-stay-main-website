"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type GalleryImage = {
  src: string;
  width: number;
  height: number;
};

type Gallery = {
  id: string;
  title: string;
  images: GalleryImage[];
};

type Props = {
  galleries: Gallery[];
};

const INITIAL_COUNT = 6;
const LOAD_STEP = 6;

export function LifeAtYaanaGallery({ galleries }: Props) {
  const initialCounts = useMemo(
    () =>
      galleries.reduce<Record<string, number>>((acc, gallery) => {
        acc[gallery.id] = Math.min(INITIAL_COUNT, gallery.images.length);
        return acc;
      }, {}),
    [galleries],
  );
  const [visibleCounts, setVisibleCounts] = useState(initialCounts);
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<{ galleryId: string; index: number } | null>(null);
  const isDev = process.env.NODE_ENV === "development";

  const activeGallery = useMemo(() => {
    if (!lightbox) return null;
    return galleries.find((g) => g.id === lightbox.galleryId) ?? null;
  }, [galleries, lightbox]);

  const activeImage = useMemo(() => {
    if (!lightbox || !activeGallery) return null;
    return activeGallery.images[lightbox.index] ?? null;
  }, [activeGallery, lightbox]);

  useEffect(() => {
    if (!lightbox || !activeGallery) return;

    setVisibleCounts((prev) => {
      const current = prev[lightbox.galleryId] ?? INITIAL_COUNT;
      const desired = Math.min(Math.max(current, lightbox.index + 1), activeGallery.images.length);
      if (desired === current) return prev;
      return { ...prev, [lightbox.galleryId]: desired };
    });
  }, [activeGallery, lightbox]);

  useEffect(() => {
    if (!lightbox || !activeGallery) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightbox((prev) => {
          if (!prev) return prev;
          const nextIndex =
            (prev.index - 1 + activeGallery.images.length) % activeGallery.images.length;
          return { ...prev, index: nextIndex };
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightbox((prev) => {
          if (!prev) return prev;
          const nextIndex = (prev.index + 1) % activeGallery.images.length;
          return { ...prev, index: nextIndex };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGallery, lightbox]);

  return (
    <>
      <div className="sticky top-4 z-20 mb-10 flex flex-wrap items-center justify-center gap-3 rounded-lg lg:rounded-full border border-white/40 bg-white/80 px-4 py-3 text-center shadow-lg backdrop-blur">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`#${gallery.id}`}
            className="inline-flex items-center justify-center rounded-full border border-yaana-charcoal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yaana-charcoal transition hover:bg-yaana-charcoal hover:text-white"
          >
            {gallery.title}
          </Link>
        ))}
      </div>

      <div className="space-y-9 md:space-y-10">
        {galleries.map((gallery) => {
          const visibleCount = visibleCounts[gallery.id] ?? INITIAL_COUNT;
          const isComplete = visibleCount >= gallery.images.length;

          return (
            <div
              key={gallery.id}
              id={gallery.id}
              className="scroll-mt-24"
              style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-yaana-charcoal uppercase tracking-tight">
                  {gallery.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.35em] text-yaana-charcoal/70">
                  {visibleCount} / {gallery.images.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[4px]">
                {gallery.images.slice(0, visibleCount).map(({ src }, i) => {
                  const isLoaded = loadedBySrc[src] ?? false;

                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setLightbox({ galleryId: gallery.id, index: i })}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-card bg-yaana-charcoal/5"
                      aria-label={`Open ${gallery.title} photo ${i + 1}`}
                    >
                      {!isLoaded ? (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-yaana-charcoal/10 via-white/40 to-yaana-charcoal/10" />
                      ) : null}

                      <Image
                        src={src}
                        alt={`${gallery.title} ${i + 1}`}
                        fill
                        quality={65}
                        loading="lazy"
                        unoptimized={isDev}
                        className={[
                          "object-cover transition duration-700 group-hover:scale-[1.04]",
                          isLoaded ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        onLoadingComplete={() =>
                          setLoadedBySrc((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
                        }
                      />
                    </button>
                  );
                })}
              </div>

              {!isComplete ? (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCounts((prev) => ({
                        ...prev,
                        [gallery.id]: Math.min(
                          prev[gallery.id] + LOAD_STEP,
                          gallery.images.length,
                        ),
                      }))
                    }
                    className="inline-flex items-center justify-center --rounded-full --border --border-yaana-charcoal/30 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.35em] text-yaana-charcoal transition --hover:bg-yaana-charcoal hover:text-white"
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <Dialog
        open={!!lightbox}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent
          onClose={() => setLightbox(null)}
          className="max-w-[min(95vw,1100px)] border-white/10 bg-black/90 p-3 sm:p-4"
        >
          {activeGallery && activeImage ? (
            <div className="relative">
              <DialogHeader className="sr-only">
                <DialogTitle>Photo viewer</DialogTitle>
                <DialogDescription>
                  View YAANA gallery photos. Use previous and next buttons or left and right arrow
                  keys to navigate. Press escape to close.
                </DialogDescription>
              </DialogHeader>

              <div className="mb-3 flex items-center justify-between gap-3 pr-10">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    {activeGallery.title}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                    {lightbox!.index + 1} / {activeGallery.images.length}
                  </p>
                </div>
              </div>

              <div className="relative h-[70vh] w-full overflow-hidden rounded-lg bg-black/40">
                <Image
                  src={activeImage.src}
                  alt={`${activeGallery.title} ${lightbox!.index + 1}`}
                  fill
                  priority
                  quality={90}
                  unoptimized={isDev}
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 1100px"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex =
                      (prev.index - 1 + activeGallery.images.length) % activeGallery.images.length;
                    return { ...prev, index: nextIndex };
                  })
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/90 backdrop-blur transition hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex = (prev.index + 1) % activeGallery.images.length;
                    return { ...prev, index: nextIndex };
                  })
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/90 backdrop-blur transition hover:bg-black/70"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
