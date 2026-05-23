"use client";

import { useEffect, useState } from "react";

export type DeviceCapability = {
  isLowEnd: boolean;
  shouldReduceAnimations: boolean;
  prefersReducedMotion: boolean;
};

/**
 * Hook to detect device capabilities and determine if animations should be reduced.
 * 
 * Detects:
 * - Hardware concurrency (CPU cores)
 * - Device memory (RAM in GB)
 * - User's prefers-reduced-motion setting
 * 
 * A device is considered low-end if:
 * - CPU cores ≤ 4, OR
 * - Device memory ≤ 4GB
 * 
 * Animations should be reduced if:
 * - Device is low-end, OR
 * - User prefers reduced motion
 * 
 * @returns {DeviceCapability} Object containing device capability flags
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isLowEnd: false,
    shouldReduceAnimations: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    // Detect hardware concurrency (CPU cores)
    // Default to 4 if API is unavailable
    const cores = navigator.hardwareConcurrency || 4;

    // Detect device memory (in GB)
    // Default to 4 if API is unavailable
    const memory = (navigator as any).deviceMemory || 4;

    // Detect prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Device is low-end if cores ≤ 4 OR memory ≤ 4GB
    const isLowEnd = cores <= 4 || memory <= 4;

    // Reduce animations if low-end OR user prefers reduced motion
    const shouldReduceAnimations = isLowEnd || prefersReducedMotion;

    setCapability({
      isLowEnd,
      shouldReduceAnimations,
      prefersReducedMotion,
    });
  }, []);

  return capability;
}
