# Implementation Plan: Subscription Page Enhancement

## Overview

This implementation plan transforms the static India Health Membership subscription page into a dynamic, engaging experience with animations and interactions matching the homepage design vibe. The enhancement uses TypeScript, React, Next.js, and Framer Motion to create smooth scroll-based animations, interactive elements, and micro-interactions while maintaining full accessibility compliance.

## Tasks

- [ ] 1. Create new animation components
  - [x] 1.1 Create CountUpAnimation component
    - Implement `src/components/ui/CountUpAnimation.tsx` with TypeScript
    - Use Framer Motion's `useInView`, `useMotionValue`, `useTransform`, and `animate` hooks
    - Accept props: `value` (number), `suffix` (string), `prefix` (string), `duration` (number), `className` (string)
    - Trigger animation when 70% visible (viewport amount: 0.7, once: true)
    - Use 1.4s duration with easing [0.22, 1, 0.36, 1]
    - Round displayed values to integers
    - _Requirements: 1.4_
  
  - [x] 1.2 Create ScrollProgress component
    - Implement `src/components/ui/ScrollProgress.tsx` with TypeScript
    - Use Framer Motion's `useScroll` and `useSpring` hooks
    - Accept props: `color` (string, default "bg-brand-coral"), `height` (string, default "h-1")
    - Apply fixed positioning at top of viewport with z-index 50
    - Use spring physics: stiffness 100, damping 30, restDelta 0.001
    - Scale width from 0% to 100% based on scroll progress
    - _Requirements: 1.15_
  
  - [x] 1.3 Create ParallaxImage component
    - Implement `src/components/ui/ParallaxImage.tsx` with TypeScript
    - Use Framer Motion's `useScroll`, `useTransform`, and `useReducedMotion` hooks
    - Accept props: `src` (string), `alt` (string), `speed` (number, default 0.6), `className` (string)
    - Apply parallax effect with scroll offset ["start end", "end start"]
    - Transform Y position based on scroll progress: [0, 1] → ["0%", `${(1 - speed) * 100}%`]
    - Disable parallax when `prefers-reduced-motion` is enabled
    - _Requirements: 1.8, 1.11.6_
  
  - [x] 1.4 Create StaggeredList component
    - Implement `src/components/ui/StaggeredList.tsx` with TypeScript
    - Use Framer Motion's `motion.div` with variants pattern
    - Accept props: `children` (ReactNode[]), `staggerDelay` (number, default 0.08), `maxDelay` (number, default 0.8), `className` (string)
    - Define container variants with `staggerChildren` and `delayChildren`
    - Define item variants: hidden (opacity 0, y 20) → visible (opacity 1, y 0)
    - Use viewport trigger: once true, margin "-12%"
    - Cap individual item delays at `maxDelay` to prevent excessive wait times
    - _Requirements: 1.7_
  
  - [x] 1.5 Write unit tests for CountUpAnimation
    - Test component renders with correct initial value (0)
    - Test component animates to target value when scrolled into view
    - Test component respects `prefers-reduced-motion` setting
    - Test component displays prefix and suffix correctly
    - _Requirements: 1.4_
  
  - [ ] 1.6 Write unit tests for ScrollProgress9
    - Test component renders with fixed positioning
    - Test component updates scaleX based on scroll progress
    - Test component uses correct color and height props
    - _Requirements: 1.15_
  
  - [ ] 1.7 Write unit tests for ParallaxImage
    - Test component renders image with correct src and alt
    - Test parallax effect is disabled when `prefers-reduced-motion` is enabled
    - Test component applies correct transform based on scroll
    - _Requirements: 1.8, 1.11.6_
  
  - [ ] 1.8 Write unit tests for StaggeredList
    - Test component renders all children
    - Test stagger delays are applied correctly
    - Test maxDelay cap is enforced for long lists
    - Test viewport trigger settings are correct
    - _Requirements: 1.7_

- [ ] 2. Create utility hooks for performance and device detection
  - [x] 2.1 Create useDeviceCapability hook
    - Implement `src/hooks/useDeviceCapability.ts` with TypeScript
    - Detect hardware concurrency (navigator.hardwareConcurrency)
    - Detect device memory (navigator.deviceMemory)
    - Detect `prefers-reduced-motion` media query
    - Return object: `{ isLowEnd: boolean, shouldReduceAnimations: boolean, prefersReducedMotion: boolean }`
    - Consider device low-end if cores ≤ 4 OR memory ≤ 4GB
    - Set `shouldReduceAnimations` to true if low-end OR prefers-reduced-motion
    - _Requirements: 1.11.2, 1.11.6_
  
  - [x] 2.2 Create usePerformanceMonitor hook
    - Implement `src/hooks/usePerformanceMonitor.ts` with TypeScript
    - Use `requestAnimationFrame` to measure frame rate
    - Track frame count over 1-second intervals
    - Return current FPS as a number
    - Clean up RAF on unmount
    - _Requirements: 1.11.1_
  
  - [ ] 2.3 Write unit tests for useDeviceCapability
    - Test hook detects low-end devices correctly
    - Test hook respects `prefers-reduced-motion` setting
    - Test hook handles missing navigator APIs gracefully
    - _Requirements: 1.11.2, 1.11.6_
  
  - [ ] 2.4 Write unit tests for usePerformanceMonitor
    - Test hook returns FPS value
    - Test hook cleans up RAF on unmount
    - _Requirements: 1.11.1_

- [ ] 3. Checkpoint - Verify new components and hooks
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Enhance subscription page with text reveal animations
  - [ ] 4.1 Replace hero heading with TextReveal component
    - Import `TextReveal` from `@/components/ui/TextReveal`
    - Replace the h1 element in hero section with `<TextReveal text="Never Navigate India's Healthcare System Alone Again." as="h1" className="..." />`
    - Maintain existing className for styling consistency
    - _Requirements: 1.1.1, 1.1.2, 1.1.5_
  
  - [ ] 4.2 Replace section headings with TextReveal component
    - Apply TextReveal to "Why This Exists" section heading
    - Apply TextReveal to "Introducing" section heading
    - Apply TextReveal to "Member Benefits" section heading
    - Apply TextReveal to "3 Plans" section heading
    - Apply TextReveal to "Is This For You?" section heading
    - Apply TextReveal to "Become a Founding Member" section heading
    - Apply TextReveal to "Why Trust Us" section heading
    - Apply TextReveal to "Everything You're Wondering About" section heading
    - Apply TextReveal to "Reserve Your Founding Member Spot" section heading
    - Maintain semantic HTML (h2 tags) and existing classNames
    - _Requirements: 1.1.1, 1.1.2, 1.1.5_
  
  - [ ] 4.3 Write integration tests for text reveal animations
    - Test hero heading animates word-by-word on page load
    - Test section headings animate when scrolled into view
    - Test animation timing matches specification (0.5s duration, 0.06s word delay)
    - _Requirements: 1.1.1, 1.1.4_

- [ ] 5. Enhance subscription page with section reveal animations
  - [ ] 5.1 Wrap benefit cards with SectionReveal
    - Import `SectionReveal` from `@/components/core/SectionReveal`
    - Wrap the benefits grid container with `<SectionReveal delay={0.1}>`
    - Ensure each benefit card animates with staggered delay
    - _Requirements: 1.2.1, 1.2.2, 1.2.4_
  
  - [ ] 5.2 Wrap tier cards with SectionReveal
    - Wrap the tiers grid container with `<SectionReveal delay={0.1}>`
    - Ensure each tier card animates with staggered delay
    - _Requirements: 1.2.1, 1.2.2, 1.2.4_
  
  - [ ] 5.3 Wrap trust points with SectionReveal
    - Wrap the trust points grid container with `<SectionReveal delay={0.1}>`
    - Ensure each trust point animates with staggered delay
    - _Requirements: 1.2.1, 1.2.2, 1.2.4_
  
  - [ ] 5.4 Wrap FAQ section with SectionReveal
    - Wrap the FAQ container with `<SectionReveal delay={0.1}>`
    - Ensure FAQ items animate when scrolled into view
    - _Requirements: 1.2.1, 1.2.2, 1.2.4_
  
  - [ ] 5.5 Write integration tests for section reveal animations
    - Test sections fade in when scrolled into view
    - Test viewport trigger margin (-12%) works correctly
    - Test animation duration and easing match specification
    - _Requirements: 1.2.1, 1.2.3, 1.2.6_

- [ ] 6. Replace CTA buttons with MagneticButton component
  - [ ] 6.1 Replace hero CTA button with MagneticButton
    - Import `MagneticButton` from `@/components/ui/MagneticButton`
    - Replace the hero section CTA button with `<MagneticButton href="#waitlist" variant="dark" showIcon={true}>`
    - Maintain existing button text and styling
    - _Requirements: 1.3.1, 1.3.2, 1.3.6_
  
  - [ ] 6.2 Replace all anchor link buttons with MagneticButton
    - Replace all buttons with href="#waitlist" with MagneticButton instances
    - Replace all buttons with href="#solution" with MagneticButton instances
    - Apply appropriate variant prop (dark, coral, light, outline) based on existing styling
    - Ensure showIcon prop is set correctly for buttons with arrow icons
    - _Requirements: 1.3.1, 1.3.2, 1.3.6_
  
  - [ ] 6.3 Write integration tests for magnetic buttons
    - Test buttons respond to mouse movement with magnetic effect
    - Test spring physics match specification (stiffness 180, damping 16, mass 0.25)
    - Test buttons return to original position when mouse leaves
    - Test keyboard focus displays visible focus ring without magnetic effect
    - _Requirements: 1.3.3, 1.3.4, 1.3.5, 1.3.7, 1.3.8_

- [ ] 7. Add count-up animation to waitlist counter
  - [ ] 7.1 Implement CountUpAnimation for waitlist counter
    - Import `CountUpAnimation` from `@/components/ui/CountUpAnimation`
    - Parse the waitlistCount string to extract the current count number
    - Replace the static waitlist count display with `<CountUpAnimation value={currentCount} suffix=" / 200" />`
    - Maintain existing styling (font-serif text-4xl font-semibold text-white)
    - _Requirements: 1.4.1, 1.4.2, 1.4.5_
  
  - [ ] 7.2 Write integration tests for count-up animation
    - Test counter animates from 0 to target value when scrolled into view
    - Test animation triggers at 70% visibility
    - Test animation duration and easing match specification
    - _Requirements: 1.4.3, 1.4.4, 1.4.6_

- [ ] 8. Add card hover interactions
  - [ ] 8.1 Add hover effects to benefit cards
    - Add Framer Motion `motion.article` wrapper to each benefit card
    - Apply `whileHover={{ y: -4, scale: 1.01 }}` animation
    - Use transition: `{ duration: 0.3, ease: "easeOut" }`
    - Enhance shadow on hover using Tailwind's `hover:shadow-lift` class
    - _Requirements: 1.5.1, 1.5.3, 1.5.4_
  
  - [ ] 8.2 Add hover effects to tier cards
    - Add Framer Motion `motion.article` wrapper to each tier card
    - Apply `whileHover={{ y: -4, scale: 1.01 }}` animation
    - Use transition: `{ duration: 0.3, ease: "easeOut" }`
    - Add border color change on hover for non-highlighted tiers
    - _Requirements: 1.5.2, 1.5.3, 1.5.4_
  
  - [ ] 8.3 Write integration tests for card hover interactions
    - Test benefit cards lift on hover
    - Test tier cards lift and change border color on hover
    - Test cards return to original state when hover ends
    - _Requirements: 1.5.1, 1.5.2, 1.5.5_

- [ ] 9. Implement smooth scroll behavior
  - [ ] 9.1 Add smooth scroll to page layout
    - Check if Lenis smooth scroll is already initialized in the root layout
    - If not, add Lenis initialization to the subscription page or root layout
    - Configure Lenis with appropriate easing and duration
    - Ensure scroll-mt offset classes are respected for anchor navigation
    - _Requirements: 1.6.1, 1.6.2, 1.6.4_
  
  - [ ] 9.2 Ensure reduced motion support for smooth scroll
    - Detect `prefers-reduced-motion` media query
    - Disable Lenis smooth scroll when reduced motion is preferred
    - Fall back to native `scroll-behavior: smooth` CSS
    - _Requirements: 1.6.5_
  
  - [ ] 9.3 Write integration tests for smooth scroll
    - Test clicking anchor links scrolls smoothly to target section
    - Test scroll respects scroll-mt offset
    - Test smooth scroll is disabled when prefers-reduced-motion is enabled
    - _Requirements: 1.6.1, 1.6.3, 1.6.5_

- [ ] 10. Add staggered list animations
  - [ ] 10.1 Apply StaggeredList to problem list
    - Import `StaggeredList` from `@/components/ui/StaggeredList`
    - Wrap the problems array map with `<StaggeredList staggerDelay={0.08}>`
    - Pass each problem item as a child element
    - _Requirements: 1.7.1, 1.7.2, 1.7.3_
  
  - [ ] 10.2 Apply StaggeredList to solution points
    - Wrap the solutionPoints array map with `<StaggeredList staggerDelay={0.08}>`
    - Pass each solution point as a child element
    - _Requirements: 1.7.1, 1.7.2, 1.7.3_
  
  - [ ] 10.3 Apply StaggeredList to trust points
    - Wrap the trustPoints array map with `<StaggeredList staggerDelay={0.08}>`
    - Pass each trust point as a child element
    - _Requirements: 1.7.1, 1.7.2, 1.7.3_
  
  - [ ] 10.4 Apply StaggeredList to founding benefits
    - Wrap the foundingBenefits array map with `<StaggeredList staggerDelay={0.08}>`
    - Pass each benefit as a child element
    - _Requirements: 1.7.1, 1.7.2, 1.7.3_
  
  - [ ] 10.5 Write integration tests for staggered list animations
    - Test list items animate with correct stagger delay (0.08s-0.12s)
    - Test lists with >8 items cap stagger delay at maxDelay
    - Test stagger animations trigger when scrolled into view
    - _Requirements: 1.7.2, 1.7.3, 1.7.4_

- [ ] 11. Checkpoint - Verify page animations
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Add hero section parallax effect
  - [ ] 12.1 Apply ParallaxImage to hero image
    - Import `ParallaxImage` from `@/components/ui/ParallaxImage`
    - Replace the static Image component in hero section with `<ParallaxImage src="/membership-hero.svg" alt="..." speed={0.6} />`
    - Maintain existing image styling and aspect ratio
    - Ensure parallax effect is subtle (speed 0.6)
    - _Requirements: 1.8.1, 1.8.2, 1.8.4_
  
  - [ ] 12.2 Write integration tests for parallax effect
    - Test hero image moves at different rate than scroll
    - Test parallax effect is disabled when prefers-reduced-motion is enabled
    - Test parallax effect does not cause layout shift
    - _Requirements: 1.8.1, 1.8.3, 1.8.5_

- [ ] 13. Enhance FAQ accordion with animations
  - [ ] 13.1 Add icon rotation animation to FAQ accordion
    - Wrap the FAQ icon span with Framer Motion `motion.span`
    - Apply `animate={{ rotate: isOpen ? 45 : 0 }}` based on open state
    - Use transition: `{ duration: 0.3, ease: "easeInOut" }`
    - _Requirements: 1.9.2, 1.9.3_
  
  - [ ] 13.2 Add height animation to FAQ accordion
    - Wrap the FAQ answer with Framer Motion `AnimatePresence` and `motion.div`
    - Apply `initial={{ height: 0, opacity: 0 }}` and `animate={{ height: "auto", opacity: 1 }}`
    - Use transition: `{ duration: 0.3, ease: "easeInOut" }`
    - Ensure only one FAQ item is open at a time (accordion behavior)
    - _Requirements: 1.9.1, 1.9.4, 1.9.5_
  
  - [ ] 13.3 Set first FAQ item expanded by default
    - Initialize FAQ state with first item open
    - Ensure first FAQ answer is visible on page load
    - _Requirements: 1.9.6_
  
  - [ ] 13.4 Write integration tests for FAQ accordion
    - Test FAQ items expand and collapse smoothly
    - Test icon rotates 45 degrees when expanded
    - Test only one FAQ item is open at a time
    - Test first FAQ item is expanded by default
    - _Requirements: 1.9.1, 1.9.2, 1.9.3, 1.9.5, 1.9.6_

- [ ] 14. Add loading state animations
  - [ ] 14.1 Add hero section fade-in animation
    - Wrap hero section content with Framer Motion `motion.div`
    - Apply `initial={{ opacity: 0 }}` and `animate={{ opacity: 1 }}`
    - Use transition: `{ duration: 0.6, delay: 0.3, ease: "easeOut" }`
    - _Requirements: 1.10.1, 1.10.3_
  
  - [ ] 14.2 Add badge stagger animation
    - Wrap the hero badges container with Framer Motion `motion.div` using variants
    - Define container variants with `staggerChildren: 0.08`
    - Define badge item variants: hidden (opacity 0, y 10) → visible (opacity 1, y 0)
    - Apply `delayChildren: 0.3` to container variants
    - _Requirements: 1.10.2, 1.10.3_
  
  - [ ] 14.3 Write integration tests for loading animations
    - Test hero section fades in on page load
    - Test badges stagger with 0.08s delay between each
    - Test initial animations start after 0.3s delay
    - _Requirements: 1.10.1, 1.10.2, 1.10.3_

- [ ] 15. Implement responsive animation behavior
  - [ ] 15.1 Add device capability detection to page
    - Import `useDeviceCapability` hook
    - Call hook at top of page component
    - Store `shouldReduceAnimations` and `isLowEnd` in variables
    - _Requirements: 1.11.2_
  
  - [ ] 15.2 Conditionally disable expensive animations on low-end devices
    - Disable parallax effect when `shouldReduceAnimations` is true
    - Disable magnetic button effects when `shouldReduceAnimations` is true
    - Reduce stagger delays to 0.05s when `isLowEnd` is true
    - _Requirements: 1.11.2_
  
  - [ ] 15.3 Add responsive translateY adjustments for mobile
    - Detect viewport width using window.innerWidth or CSS media query
    - Reduce all translateY animation distances to 50% when viewport < 768px
    - Apply reduced distances to SectionReveal and StaggeredList components
    - _Requirements: 1.11.4_
  
  - [ ] 15.4 Optimize will-change property usage
    - Add `will-change: transform` to elements during active animation
    - Remove `will-change` property within 100ms after animation completion
    - Use Framer Motion's `onAnimationStart` and `onAnimationComplete` callbacks
    - _Requirements: 1.11.5_
  
  - [ ] 15.5 Ensure reduced motion support across all animations
    - Verify all scroll-based animations respect `prefers-reduced-motion`
    - Verify parallax effects are disabled when `prefers-reduced-motion` is enabled
    - Verify magnetic button effects are disabled when `prefers-reduced-motion` is enabled
    - Verify count-up animations are disabled when `prefers-reduced-motion` is enabled
    - Verify staggered reveals are disabled when `prefers-reduced-motion` is enabled
    - Preserve instant state transitions for interactive elements (button clicks, FAQ expand/collapse)
    - _Requirements: 1.11.6, 1.11.7_
  
  - [ ] 15.6 Write integration tests for responsive behavior
    - Test animations maintain 30fps on mobile viewport (375px)
    - Test expensive animations are disabled on low-end devices
    - Test translateY distances are reduced on mobile
    - Test will-change property is applied and removed correctly
    - _Requirements: 1.11.1, 1.11.2, 1.11.4, 1.11.5_

- [ ] 16. Add micro-interactions to interactive elements
  - [ ] 16.1 Add hover effects to clickable elements
    - Apply `hover:scale-[1.02]` to all clickable cards
    - Apply `hover:shadow-lift` to cards with elevation
    - Use `transition-transform duration-300` for smooth transitions
    - _Requirements: 1.14.1, 1.14.3_
  
  - [ ] 16.2 Add click feedback to buttons
    - Apply `active:scale-[0.98]` to all button elements
    - Use `transition-transform duration-150` for immediate feedback
    - _Requirements: 1.14.2, 1.14.4_
  
  - [ ] 16.3 Add hover effects to links
    - Apply `hover:text-brand-coral` to footer links
    - Apply `transition-colors duration-300` for smooth color transitions
    - _Requirements: 1.14.5_
  
  - [ ] 16.4 Write integration tests for micro-interactions
    - Test cards scale on hover
    - Test buttons scale down on click
    - Test links change color on hover
    - Test transition durations match specification
    - _Requirements: 1.14.1, 1.14.2, 1.14.4, 1.14.5_

- [ ] 17. Add scroll progress indicator
  - [ ] 17.1 Add ScrollProgress component to page
    - Import `ScrollProgress` from `@/components/ui/ScrollProgress`
    - Add `<ScrollProgress color="bg-brand-coral" height="h-1" />` at the top of the page component
    - Ensure component is rendered outside main content flow
    - _Requirements: 1.15.1, 1.15.2, 1.15.5_
  
  - [ ] 17.2 Write integration tests for scroll progress indicator
    - Test progress bar updates smoothly as user scrolls
    - Test progress bar spans from 0% to 100% width
    - Test progress bar has fixed positioning at top of viewport
    - _Requirements: 1.15.1, 1.15.3, 1.15.4_

- [ ] 18. Ensure visual hierarchy and design consistency
  - [ ] 18.1 Verify spacing consistency
    - Audit all section spacing to ensure multiples of 4px or 8px
    - Apply consistent padding and margin values from Design_System
    - _Requirements: 1.13.1_
  
  - [ ] 18.2 Verify typography consistency
    - Audit all font sizes to ensure they match Design_System scale
    - Verify font families (Cormorant Garamond serif, Inter sans) are applied correctly
    - _Requirements: 1.13.2_
  
  - [ ] 18.3 Verify background color separation
    - Ensure sections alternate between brand-cream, white, and brand-dark backgrounds
    - Verify visual separation is clear between sections
    - _Requirements: 1.13.3_
  
  - [ ] 18.4 Verify border-radius consistency
    - Audit all rounded corners to ensure consistent use of rounded-xl, rounded-2xl, rounded-full
    - Match border-radius values with Homepage patterns
    - _Requirements: 1.13.4_
  
  - [ ] 18.5 Verify color contrast ratios
    - Test text contrast on brand-cream background (minimum WCAG AA)
    - Test text contrast on white background (minimum WCAG AA)
    - Test text contrast on brand-dark background (minimum WCAG AA)
    - _Requirements: 1.13.5_

- [ ] 19. Final checkpoint - Comprehensive testing and validation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Performance optimization and final polish
  - [ ] 20.1 Run performance monitoring
    - Use `usePerformanceMonitor` hook to measure FPS during animations
    - Log FPS to console during development
    - Identify any animations causing frame rate drops below 30fps
    - _Requirements: 1.11.1_
  
  - [ ] 20.2 Optimize animation performance
    - Ensure all animations use CSS transforms (translateX, translateY, scale)
    - Verify no animations use layout properties (width, height, top, left)
    - Apply GPU acceleration hints where appropriate
    - _Requirements: 1.11.1_
  
  - [ ] 20.3 Test accessibility compliance
    - Test keyboard navigation for all interactive elements
    - Test screen reader compatibility with animations
    - Verify focus indicators are visible on all interactive elements
    - Test with prefers-reduced-motion enabled
    - _Requirements: 1.11.6, 1.11.7_
  
  - [ ] 20.4 Cross-browser testing
    - Test animations in Chrome (latest 2 versions)
    - Test animations in Firefox (latest 2 versions)
    - Test animations in Safari (latest 2 versions)
    - Test animations in Edge (latest 2 versions)
    - Document any browser-specific issues
  
  - [ ] 20.5 Write end-to-end integration tests
    - Test complete user journey from page load to waitlist signup
    - Test all animations trigger correctly during scroll
    - Test all interactive elements respond correctly
    - Test page maintains 60fps on desktop and 30fps on mobile

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Unit tests validate specific component behavior and edge cases
- Integration tests validate animation timing, triggers, and user interactions
- The implementation uses TypeScript with React, Next.js, and Framer Motion
- All animations respect `prefers-reduced-motion` for accessibility
- Performance optimizations ensure smooth animations on both desktop and mobile devices

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "2.1", "2.2"] },
    { "id": 1, "tasks": ["1.5", "1.6", "1.7", "1.8", "2.3", "2.4"] },
    { "id": 2, "tasks": ["4.1", "4.2", "5.1", "5.2", "5.3", "5.4"] },
    { "id": 3, "tasks": ["4.3", "5.5", "6.1", "6.2", "7.1"] },
    { "id": 4, "tasks": ["6.3", "7.2", "8.1", "8.2", "9.1", "9.2"] },
    { "id": 5, "tasks": ["8.3", "9.3", "10.1", "10.2", "10.3", "10.4"] },
    { "id": 6, "tasks": ["10.5", "12.1", "13.1", "13.2", "13.3"] },
    { "id": 7, "tasks": ["12.2", "13.4", "14.1", "14.2"] },
    { "id": 8, "tasks": ["14.3", "15.1", "15.2", "15.3", "15.4", "15.5"] },
    { "id": 9, "tasks": ["15.6", "16.1", "16.2", "16.3", "17.1"] },
    { "id": 10, "tasks": ["16.4", "17.2", "18.1", "18.2", "18.3", "18.4", "18.5"] },
    { "id": 11, "tasks": ["20.1", "20.2", "20.3", "20.4", "20.5"] }
  ]
}
```
