"use client";

import { useEffect, useState } from "react";

/**
 * Hook to monitor frame rate performance using requestAnimationFrame.
 * Tracks frame count over 1-second intervals and returns current FPS.
 * 
 * @returns Current frames per second (FPS) as a number
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fps = usePerformanceMonitor();
 *   console.log(`Current FPS: ${fps}`);
 *   return <div>FPS: {fps}</div>;
 * }
 * ```
 */
export function usePerformanceMonitor(): number {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();

      // Check if 1 second has elapsed
      if (currentTime >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measureFps);
    };

    rafId = requestAnimationFrame(measureFps);

    // Cleanup RAF on unmount
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return fps;
}
