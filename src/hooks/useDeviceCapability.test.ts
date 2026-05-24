/**
 * Unit tests for useDeviceCapability hook
 * 
 * Note: These tests require a testing framework (Jest + React Testing Library)
 * to be installed and configured. Run: npm install --save-dev jest @testing-library/react @testing-library/react-hooks
 */

import { renderHook } from '@testing-library/react';
import { useDeviceCapability } from './useDeviceCapability';

describe('useDeviceCapability', () => {
  // Store original values to restore after tests
  const originalHardwareConcurrency = navigator.hardwareConcurrency;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    // Restore original values
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: originalHardwareConcurrency,
      writable: true,
      configurable: true,
    });
    window.matchMedia = originalMatchMedia;
  });

  it('should detect low-end device when cores <= 4', () => {
    // Mock navigator.hardwareConcurrency to return 4 cores
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 4,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to return 8GB (not low-end)
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to false
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    expect(result.current.isLowEnd).toBe(true);
    expect(result.current.shouldReduceAnimations).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should detect low-end device when memory <= 4GB', () => {
    // Mock navigator.hardwareConcurrency to return 8 cores (not low-end)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to return 4GB
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 4,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to false
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    expect(result.current.isLowEnd).toBe(true);
    expect(result.current.shouldReduceAnimations).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should detect high-end device when cores > 4 AND memory > 4GB', () => {
    // Mock navigator.hardwareConcurrency to return 8 cores
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to return 8GB
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to false
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    expect(result.current.isLowEnd).toBe(false);
    expect(result.current.shouldReduceAnimations).toBe(false);
    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should respect prefers-reduced-motion setting', () => {
    // Mock navigator.hardwareConcurrency to return 8 cores (high-end)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to return 8GB (high-end)
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to true
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    expect(result.current.isLowEnd).toBe(false);
    expect(result.current.shouldReduceAnimations).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(true);
  });

  it('should handle missing navigator APIs gracefully', () => {
    // Mock navigator.hardwareConcurrency to undefined (API unavailable)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to undefined (API unavailable)
    Object.defineProperty(navigator, 'deviceMemory', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to false
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    // Should default to 4 cores and 4GB (low-end)
    expect(result.current.isLowEnd).toBe(true);
    expect(result.current.shouldReduceAnimations).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should set shouldReduceAnimations when both low-end AND prefers-reduced-motion', () => {
    // Mock navigator.hardwareConcurrency to return 2 cores (low-end)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 2,
      writable: true,
      configurable: true,
    });

    // Mock deviceMemory to return 2GB (low-end)
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 2,
      writable: true,
      configurable: true,
    });

    // Mock prefers-reduced-motion to true
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());

    expect(result.current.isLowEnd).toBe(true);
    expect(result.current.shouldReduceAnimations).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(true);
  });
});
