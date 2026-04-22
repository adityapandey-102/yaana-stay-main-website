"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logError } from "@/lib/logging";

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement>;
  api: any;
  scrollPrev: () => void;
  scrollNext: () => void;
  nextPage: () => void;
  currentPage: number;
  totalPages: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  autoplayDuration: number;
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;
  progress: number;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: any;
  setApi?: (api: any) => void;
  plugins?: any[];
  autoplayDuration?: number;
  pauseOnHover?: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      opts = {},
      setApi,
      plugins = [],
      className,
      children,
      autoplayDuration = 0,
      pauseOnHover = true,
      ...props
    },
    ref
  ) => {
    const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(null);
    const [api, setApiState] = React.useState<any>(null);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const rafRef = React.useRef<number | null>(null);
    const startTimeRef = React.useRef<number | null>(null);
    const optsRef = React.useRef(opts);
    const pluginsRef = React.useRef(plugins);

    React.useEffect(() => {
      if (!carouselRef) return;
      let embla: any = null;

      const loadEmbla = async () => {
        try {
          const EmblaCarousel = (await import("embla-carousel")).default;
          embla = EmblaCarousel(carouselRef, optsRef.current, pluginsRef.current);
          setApiState(embla);
          setApi?.(embla);

          const onSelect = () => {
            setCanScrollPrev(embla.canScrollPrev());
            setCanScrollNext(embla.canScrollNext());
            setCurrentPage(embla.selectedScrollSnap());
            setTotalPages(embla.scrollSnapList().length);
          };

          embla.on("init", onSelect);
          embla.on("reInit", onSelect);
          embla.on("select", onSelect);
          onSelect();
        } catch (error) {
          logError("Failed to load Embla Carousel:", error);
        }
      };

      loadEmbla();
      return () => embla?.destroy();
    }, [carouselRef, setApi]);

    React.useEffect(() => {
      if (!api || autoplayDuration <= 0) return;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
      setProgress(0);

      if (isPaused) return;

      const tick = (timestamp: number) => {
        if (startTimeRef.current === null) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const ratio = Math.min(elapsed / autoplayDuration, 1);
        setProgress(ratio);

        if (ratio < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          api.scrollNext();
        }
      };

      rafRef.current = requestAnimationFrame(tick);

      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }, [api, autoplayDuration, isPaused, currentPage]);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    const nextPage = React.useCallback(() => api?.scrollNext(), [api]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: { current: carouselRef },
          api,
          scrollPrev,
          scrollNext,
          nextPage,
          currentPage,
          totalPages,
          canScrollPrev,
          canScrollNext,
          autoplayDuration,
          isPaused,
          setIsPaused,
          progress,
        }}
      >
        <div
          ref={ref}
          className={cn("relative w-full", className)}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          onFocus={() => pauseOnHover && setIsPaused(true)}
          onBlur={() => pauseOnHover && setIsPaused(false)}
          {...props}
        >
          <div
            ref={setCarouselRef}
            className="overflow-hidden"
          >
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex", className)}
    {...props}
  />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { basis?: string }
>(({ className, basis, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0", className)}
    style={basis ? { flex: `0 0 ${basis}` } : undefined}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-lavender-600 transition-colors disabled:opacity-50",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft className="h-6 w-6 text-yaana-nearblack" />
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-lavender-600 transition-colors disabled:opacity-50",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight className="h-6 w-6 text-yaana-nearblack" />
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  dotClassName?: string;
  activeDotClassName?: string;
}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, dotClassName, activeDotClassName, ...props }, ref) => {
    const { currentPage, totalPages, api, progress, autoplayDuration } = useCarousel();

    if (totalPages <= 1) return null;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Carousel pages"
        className={cn("flex items-center justify-center gap-2 mt-4", className)}
        {...props}
      >
        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = index === currentPage;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-1.5 rounded-full overflow-hidden transition-all duration-300",
                isActive
                  ? cn("w-8 bg-gray-300", activeDotClassName)
                  : cn("w-4 bg-gray-300/50 hover:bg-gray-300/70", dotClassName)
              )}
            >
              {isActive && autoplayDuration > 0 && (
                <span
                  className="absolute inset-y-0 left-0 bg-gray-700 rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    transition: "width 0.05s linear",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";

const CarouselAutoplayToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isPaused, setIsPaused } = useCarousel();
  return (
    <button
      ref={ref}
      onClick={() => setIsPaused(!isPaused)}
      aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
      className={cn(
        "h-8 w-8 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors",
        className
      )}
      {...props}
    >
      {isPaused ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current text-gray-700"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current text-gray-700"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      )}
    </button>
  );
});
CarouselAutoplayToggle.displayName = "CarouselAutoplayToggle";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselAutoplayToggle,
  useCarousel,
};
