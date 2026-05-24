"use client";

import Lenis from "@studio-freight/lenis";
import { ReactNode, useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 28,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
      gestureOrientation: "vertical"
    });

    lenisRef.current = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const handleToggle = (e: CustomEvent) => {
      if (e.detail?.stop) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener("lenis-toggle", handleToggle as EventListener);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-toggle", handleToggle as EventListener);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
