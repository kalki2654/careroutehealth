"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  slideClass?: string;
  showDots?: boolean;
  showArrows?: boolean;
  controlsPlacement?: "overlay" | "bottom";
  autoplay?: boolean;
  autoplayInterval?: number;
  breakpoint?: string;
  onEmblaApi?: (api: EmblaCarouselType) => void;
};

export function Carousel({
  children,
  className,
  slideClass,
  showDots = true,
  showArrows = true,
  controlsPlacement = "overlay",
  autoplay = false,
  autoplayInterval = 4000,
  onEmblaApi,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    skipSnaps: false,
    duration: 32,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateCarouselState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    const frame = window.requestAnimationFrame(updateCarouselState);
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);
    onEmblaApi?.(emblaApi);

    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi, onEmblaApi]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slideCount = scrollSnaps.length;
  const hasControls = slideCount > 1;
  const dotClasses = (index: number, bottom = false) =>
    cn(
      "h-2 rounded-full transition-all duration-300",
      index === selectedIndex
        ? "w-8 bg-brand-coral"
        : cn("w-2", bottom ? "bg-brand-coral/40" : "bg-white/30")
    );

  return (
    <div className={cn("relative min-w-0 max-w-full", className)}>
      <div className="overflow-hidden touch-pan-y" ref={emblaRef} data-lenis-prevent-touch>
        <div className="flex will-change-transform">
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index} className={cn("min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3", slideClass)}>
                  {child}
                </div>
              ))
            : <div className="min-w-0 shrink-0 grow-0 basis-full">{children}</div>}
        </div>
      </div>

      {showArrows && hasControls && controlsPlacement === "overlay" && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-brand-coral text-white shadow-lg transition-opacity hover:opacity-90 md:h-12 md:w-12"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-brand-coral text-white shadow-lg transition-opacity hover:opacity-90 md:h-12 md:w-12"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
          </button>
        </>
      )}

      {showDots && hasControls && controlsPlacement === "overlay" && (
        <div className="mt-4 flex items-center justify-center gap-2 md:mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={dotClasses(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {hasControls && controlsPlacement === "bottom" ? (
        <div className="mt-4 flex items-center justify-center gap-3 md:mt-6">
          {showArrows ? (
            <button
              type="button"
              onClick={scrollPrev}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-coral text-white shadow-lg transition-opacity hover:opacity-90 md:h-12 md:w-12"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
            </button>
          ) : null}

          {showDots ? (
            <div className="flex min-w-0 items-center justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={dotClasses(index, true)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}

          {showArrows ? (
            <button
              type="button"
              onClick={scrollNext}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-coral text-white shadow-lg transition-opacity hover:opacity-90 md:h-12 md:w-12"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
