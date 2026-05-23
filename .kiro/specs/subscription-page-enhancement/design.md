# Design Document: Subscription Page Enhancement

## Overview

This design document outlines the technical approach for enhancing the India Health Membership subscription page (`india-health-membership`) with animations, interactions, and visual effects that match the homepage's design vibe. The enhancement will transform a static page into a dynamic, engaging experience while maintaining all existing content, messaging, and accessibility standards.

### Goals

- Apply consistent animation patterns from the homepage to the subscription page
- Implement interactive elements (magnetic buttons, hover effects, scroll-based animations)
- Maintain 60fps performance across devices
- Ensure full accessibility compliance (keyboard navigation, reduced motion support)
- Create reusable animation components for future pages

### Non-Goals

- Changing page content, messaging, or information architecture
- Redesigning the visual layout or component structure
- Adding new features beyond animations and interactions
- Modifying the waitlist form functionality

### Success Criteria

- All 15 requirements implemented with smooth animations
- Page maintains 60fps on modern devices (Chrome, Firefox, Safari, Edge)
- Animations respect `prefers-reduced-motion` media query
- All interactive elements remain keyboard accessible
- Animation timing and easing match homepage patterns

## Architecture

### Technology Stack

- **Framework**: Next.js 16.2.6 (React 18.3.1)
- **Animation Library**: Framer Motion 11.18.2
- **Smooth Scroll**: Lenis 1.0.42
- **Styling**: Tailwind CSS 3.4.17
- **TypeScript**: 5.7.2

### Animation System Architecture

The animation system follows a component-based architecture with three layers:

```
┌─────────────────────────────────────────────────────────┐
│                    Page Layer                           │
│  (india-health-membership/page.tsx)                     │
│  - Composes animation components                        │
│  - Manages page-level state                             │
│  - Applies scroll progress tracking                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Animation Components Layer                  │
│  - TextReveal (word-by-word text animation)             │
│  - SectionReveal (section fade-in/slide-up)             │
│  - MagneticButton (mouse-following button)              │
│  - CountUpAnimation (number counting effect)            │
│  - ScrollProgress (progress bar indicator)              │
│  - ParallaxImage (parallax scroll effect)               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Core Animation Layer                     │
│  - Framer Motion hooks (useInView, useScroll, etc.)     │
│  - Spring physics configuration                          │
│  - Easing functions                                      │
│  - Performance optimizations                             │
└─────────────────────────────────────────────────────────┘
```

### Performance Strategy

1. **CSS Transforms**: Use `translateX`, `translateY`, `scale` instead of layout properties
2. **will-change**: Apply only during active animations, remove after completion
3. **Lazy Animation**: Trigger animations only when elements enter viewport
4. **Reduced Complexity**: Detect low-end devices and disable expensive effects
5. **RAF Optimization**: Use Framer Motion's built-in RAF management

### Accessibility Strategy

1. **Reduced Motion**: Disable scroll-based animations when `prefers-reduced-motion: reduce`
2. **Keyboard Navigation**: Maintain focus indicators and tab order
3. **Semantic HTML**: Preserve heading hierarchy and ARIA labels
4. **Instant Feedback**: Keep immediate state transitions for interactive elements

## Components and Interfaces

### 1. TextReveal Component (Existing)

**Location**: `src/components/ui/TextReveal.tsx`

**Purpose**: Animates text word-by-word with fade-in effect on scroll into view.

**Interface**:
```typescript
type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  once?: boolean;
};
```

**Usage Pattern**:
```tsx
<TextReveal 
  text="Never Navigate India's Healthcare System Alone Again" 
  as="h1"
  className="font-serif text-[3rem]..."
/>
```

**Animation Specifications**:
- Initial opacity: 0.25
- Final opacity: 1
- Duration: 0.5s per word
- Delay: 0.06s between words
- Easing: [0.22, 1, 0.36, 1] (custom cubic-bezier)
- Viewport trigger: -10% margin

### 2. SectionReveal Component (Existing)

**Location**: `src/components/core/SectionReveal.tsx`

**Purpose**: Animates entire sections with fade-in and slide-up effect.

**Interface**:
```typescript
type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};
```

**Usage Pattern**:
```tsx
<SectionReveal delay={0.1}>
  <div className="grid gap-3">
    {/* Section content */}
  </div>
</SectionReveal>
```

**Animation Specifications**:
- Initial: opacity 0, translateY 28px
- Final: opacity 1, translateY 0
- Duration: 0.7s
- Easing: [0.22, 1, 0.36, 1]
- Viewport trigger: -12% margin
- Once: true (animate only once)

### 3. MagneticButton Component (Existing)

**Location**: `src/components/ui/MagneticButton.tsx`

**Purpose**: Interactive button with magnetic attraction effect following mouse movement.

**Interface**:
```typescript
type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children" | "onMouseMove" | "onMouseLeave"> & {
  children: ReactNode;
  variant?: "dark" | "coral" | "light" | "outline";
  showIcon?: boolean;
};
```

**Usage Pattern**:
```tsx
<MagneticButton 
  href="#waitlist" 
  variant="dark"
  showIcon={true}
>
  Reserve My Founding Member Spot
</MagneticButton>
```

**Animation Specifications**:
- Spring physics: stiffness 180, damping 16, mass 0.25
- Movement multiplier: 0.16 (16% of distance from center)
- Hover effect: translateY(-2px)
- Focus ring: 2px brand-coral with offset

### 4. CountUpAnimation Component (New)

**Location**: `src/components/ui/CountUpAnimation.tsx`

**Purpose**: Animates numbers from 0 to target value when scrolled into view.

**Interface**:
```typescript
type CountUpAnimationProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};
```

**Implementation Pattern**:
```typescript
function CountUpAnimation({ value, suffix = "", prefix = "", duration = 1.4, className }: CountUpAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { 
      duration, 
      ease: [0.22, 1, 0.36, 1] 
    });
    return controls.stop;
  }, [count, inView, value, duration]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
```

**Animation Specifications**:
- Initial value: 0
- Duration: 1.4s
- Easing: [0.22, 1, 0.36, 1]
- Viewport trigger: 70% visible (amount: 0.7)
- Once: true

### 5. ScrollProgress Component (New)

**Location**: `src/components/ui/ScrollProgress.tsx`

**Purpose**: Displays a progress bar at the top of the viewport showing scroll position.

**Interface**:
```typescript
type ScrollProgressProps = {
  color?: string;
  height?: string;
};
```

**Implementation Pattern**:
```typescript
function ScrollProgress({ color = "bg-brand-coral", height = "h-1" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`fixed left-0 top-0 z-50 ${height} ${color} origin-left`}
      style={{ scaleX, width: "100%" }}
    />
  );
}
```

**Animation Specifications**:
- Position: fixed, top 0, left 0
- Width: 100% container, scaleX based on scroll
- Spring: stiffness 100, damping 30
- Z-index: 50 (above content)

### 6. ParallaxImage Component (New)

**Location**: `src/components/ui/ParallaxImage.tsx`

**Purpose**: Applies subtle parallax effect to images on scroll.

**Interface**:
```typescript
type ParallaxImageProps = {
  src: string;
  alt: string;
  speed?: number; // 0.5 to 0.8
  className?: string;
};
```

**Implementation Pattern**:
```typescript
function ParallaxImage({ src, alt, speed = 0.6, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${(1 - speed) * 100}%`]);
  
  const reducedMotion = useReducedMotion();
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: reducedMotion ? 0 : y }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
```

**Animation Specifications**:
- Speed multiplier: 0.5-0.8 (slower than scroll)
- Offset: ["start end", "end start"]
- Disabled when prefers-reduced-motion

### 7. StaggeredList Component (New)

**Location**: `src/components/ui/StaggeredList.tsx`

**Purpose**: Animates list items with staggered delays.

**Interface**:
```typescript
type StaggeredListProps = {
  children: ReactNode[];
  staggerDelay?: number;
  maxDelay?: number;
  className?: string;
};
```

**Implementation Pattern**:
```typescript
function StaggeredList({ 
  children, 
  staggerDelay = 0.08, 
  maxDelay = 0.8,
  className 
}: StaggeredListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          transition={{
            delay: Math.min(index * staggerDelay, maxDelay)
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Animation Specifications**:
- Stagger delay: 0.08s-0.12s between items
- Max delay cap: 0.8s (for lists > 8 items)
- Item animation: opacity 0→1, translateY 20px→0
- Duration: 0.5s per item

### 8. Enhanced FAQ Accordion

**Modifications to Existing**: `src/components/sections/FAQAccordion.tsx`

The existing FAQ accordion will be enhanced with:
- Icon rotation animation (0° to 45° for "+" to "×" transition)
- Smoother height animation with AnimatePresence
- First item expanded by default

**Animation Specifications**:
- Height: 0 to auto with 0.3s duration
- Icon rotation: 45deg with 0.3s duration
- Easing: ease-in-out
- Only one item open at a time (accordion behavior)

## Data Models

### Animation Configuration

```typescript
type AnimationConfig = {
  duration: number;
  delay: number;
  easing: [number, number, number, number];
  viewport: {
    once: boolean;
    margin: string;
    amount?: number;
  };
};

const defaultAnimationConfig: AnimationConfig = {
  duration: 0.7,
  delay: 0,
  easing: [0.22, 1, 0.36, 1],
  viewport: {
    once: true,
    margin: "-12%"
  }
};
```

### Device Capability Detection

```typescript
type DeviceCapability = {
  isLowEnd: boolean;
  shouldReduceAnimations: boolean;
  prefersReducedMotion: boolean;
};

function detectDeviceCapability(): DeviceCapability {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  const isLowEnd = cores <= 4 || memory <= 4;
  
  return {
    isLowEnd,
    shouldReduceAnimations: isLowEnd || prefersReducedMotion,
    prefersReducedMotion
  };
}
```

### Responsive Animation Settings

```typescript
type ResponsiveAnimationSettings = {
  mobile: {
    translateYMultiplier: number;
    maxStaggerDelay: number;
    disableParallax: boolean;
    disableMagnetic: boolean;
  };
  desktop: {
    translateYMultiplier: number;
    maxStaggerDelay: number;
    disableParallax: boolean;
    disableMagnetic: boolean;
  };
};

const responsiveSettings: ResponsiveAnimationSettings = {
  mobile: {
    translateYMultiplier: 0.5,
    maxStaggerDelay: 0.05,
    disableParallax: true,
    disableMagnetic: false
  },
  desktop: {
    translateYMultiplier: 1.0,
    maxStaggerDelay: 0.12,
    disableParallax: false,
    disableMagnetic: false
  }
};
```

## Error Handling

### Animation Failure Scenarios

1. **Framer Motion Not Loaded**
   - Fallback: Render static content without animations
   - Detection: Try-catch around motion component imports
   - User impact: Page remains functional, just without animations

2. **Low-End Device Performance**
   - Detection: Monitor frame rate using `requestAnimationFrame`
   - Mitigation: Disable expensive animations (parallax, magnetic buttons)
   - Threshold: < 30fps for 3 consecutive seconds

3. **Viewport Detection Failure**
   - Fallback: Trigger animations immediately on mount
   - Detection: Check if `IntersectionObserver` is available
   - User impact: All animations play at once (less polished but functional)

4. **Smooth Scroll Initialization Failure**
   - Fallback: Use native `scroll-behavior: smooth`
   - Detection: Try-catch around Lenis initialization
   - User impact: Slightly less smooth scrolling

### Error Handling Implementation

```typescript
// Animation error boundary
function AnimationErrorBoundary({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      if (error.message.includes("framer-motion")) {
        setHasError(true);
      }
    };
    
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
}

// Performance monitoring
function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFps);
    };
    
    const rafId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  return fps;
}
```

## Testing Strategy

This feature focuses on UI animations and interactions, which are not suitable for property-based testing. The testing strategy will use:

### 1. Unit Tests (Example-Based)

**Test Framework**: Jest + React Testing Library

**Test Coverage**:

- **Component Rendering**
  - TextReveal renders with correct text and semantic HTML
  - SectionReveal wraps children correctly
  - MagneticButton renders with correct variant styles
  - CountUpAnimation displays initial and final values
  - ScrollProgress renders with correct positioning

- **Animation Triggers**
  - TextReveal animates when scrolled into view
  - SectionReveal triggers at -12% viewport margin
  - CountUpAnimation starts at 70% visibility
  - FAQ accordion expands/collapses on click

- **Accessibility**
  - Reduced motion disables scroll-based animations
  - Keyboard navigation works for all interactive elements
  - Focus indicators visible on MagneticButton
  - Semantic HTML preserved with animations

- **Edge Cases**
  - Empty text in TextReveal
  - Zero value in CountUpAnimation
  - Rapid FAQ accordion clicks
  - Multiple simultaneous animations

**Example Test**:
```typescript
describe("TextReveal", () => {
  it("should render text with correct semantic tag", () => {
    render(<TextReveal text="Hello World" as="h1" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello World");
  });

  it("should respect prefers-reduced-motion", () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    render(<TextReveal text="Hello World" />);
    // Verify animation is disabled
  });
});
```

### 2. Integration Tests

**Test Framework**: Playwright

**Test Coverage**:

- **Page Load Animations**
  - Hero section fades in on page load
  - Badges stagger with correct delays
  - Initial animations complete within 2 seconds

- **Scroll-Based Animations**
  - Sections animate when scrolled into view
  - Scroll progress bar updates correctly
  - Parallax effect works on hero image

- **Interactive Elements**
  - Magnetic buttons respond to mouse movement
  - Hover effects apply to cards
  - FAQ accordion expands/collapses smoothly
  - Smooth scroll works for anchor links

- **Responsive Behavior**
  - Animations work on mobile viewport (375px)
  - Animations work on tablet viewport (768px)
  - Animations work on desktop viewport (1440px)
  - Low-end device detection disables expensive effects

**Example Test**:
```typescript
test("should animate sections on scroll", async ({ page }) => {
  await page.goto("/india-health-membership");
  
  // Scroll to benefits section
  await page.locator("#benefits").scrollIntoViewIfNeeded();
  
  // Wait for animation to complete
  await page.waitForTimeout(1000);
  
  // Verify section is visible and animated
  const section = page.locator("#benefits");
  await expect(section).toBeVisible();
  await expect(section).toHaveCSS("opacity", "1");
});
```

### 3. Visual Regression Tests

**Test Framework**: Playwright + Percy/Chromatic

**Test Coverage**:

- Snapshot of each major section before and after animation
- Hover states for interactive elements
- Focus states for keyboard navigation
- Mobile vs desktop layouts
- Reduced motion mode

### 4. Performance Tests

**Test Framework**: Lighthouse CI

**Metrics**:

- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s
- Frame rate during animations ≥ 30fps (mobile), ≥ 60fps (desktop)

### 5. Accessibility Tests

**Test Framework**: axe-core + Pa11y

**Coverage**:

- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader compatibility
- Color contrast ratios
- Focus management during animations

### Test Execution Strategy

1. **Unit tests**: Run on every commit (pre-commit hook)
2. **Integration tests**: Run on pull request
3. **Visual regression**: Run on pull request to main
4. **Performance tests**: Run on staging deployment
5. **Accessibility tests**: Run on pull request and staging

### Manual Testing Checklist

- [ ] All animations play smoothly at 60fps on desktop
- [ ] Animations maintain 30fps on mobile devices
- [ ] Reduced motion mode disables scroll-based animations
- [ ] Keyboard navigation works for all interactive elements
- [ ] Magnetic buttons respond correctly to mouse movement
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Smooth scroll works for all anchor links
- [ ] Count-up animation triggers at correct scroll position
- [ ] Scroll progress bar updates accurately
- [ ] Parallax effect is subtle and not disorienting
- [ ] All hover effects work correctly
- [ ] Page loads gracefully with staggered animations
- [ ] Low-end device detection works correctly
- [ ] All animations respect brand timing and easing

## Implementation Plan

### Phase 1: Component Creation (New Components)

1. Create `CountUpAnimation.tsx` component
2. Create `ScrollProgress.tsx` component
3. Create `ParallaxImage.tsx` component
4. Create `StaggeredList.tsx` component
5. Create `useDeviceCapability.ts` hook
6. Create `usePerformanceMonitor.ts` hook

### Phase 2: Page Integration (Subscription Page)

1. Replace static headings with `TextReveal` components
2. Wrap sections with `SectionReveal` components
3. Replace anchor links with `MagneticButton` components
4. Add `CountUpAnimation` to waitlist counter
5. Add `ScrollProgress` to page root
6. Add `ParallaxImage` to hero section
7. Wrap lists with `StaggeredList` components
8. Enhance FAQ accordion with icon rotation

### Phase 3: Styling and Micro-Interactions

1. Add hover effects to benefit cards
2. Add hover effects to tier cards
3. Add button click feedback animations
4. Add loading state animations for hero section
5. Ensure consistent spacing and visual hierarchy

### Phase 4: Performance Optimization

1. Implement device capability detection
2. Add responsive animation settings
3. Apply `will-change` optimization
4. Test and optimize frame rate
5. Implement lazy loading for animations

### Phase 5: Accessibility and Testing

1. Add reduced motion support
2. Ensure keyboard navigation
3. Test with screen readers
4. Write unit tests for components
5. Write integration tests for page
6. Run visual regression tests
7. Run performance tests
8. Run accessibility tests

### Phase 6: Documentation and Handoff

1. Document animation patterns
2. Create component usage examples
3. Update design system documentation
4. Create animation guidelines for future pages

## Migration Strategy

### Backward Compatibility

- All existing content and functionality preserved
- No breaking changes to page structure
- Graceful degradation for unsupported browsers

### Rollout Plan

1. **Development**: Implement on feature branch
2. **Staging**: Deploy to staging environment for QA
3. **A/B Test**: Test with 10% of traffic for performance monitoring
4. **Full Rollout**: Deploy to 100% of traffic after validation

### Rollback Plan

If critical issues are discovered:
1. Revert to previous version via Git
2. Disable animations via feature flag
3. Investigate and fix issues
4. Re-deploy with fixes

## Future Enhancements

### Potential Improvements

1. **Advanced Parallax**: Multi-layer parallax for depth
2. **Scroll-Linked Animations**: GSAP ScrollTrigger integration
3. **3D Transforms**: Subtle 3D card rotations on hover
4. **Cursor Follower**: Custom cursor with trailing effect
5. **Page Transitions**: Smooth transitions between pages
6. **Loading Animations**: Skeleton screens for content loading
7. **Gesture Support**: Swipe gestures for mobile carousels

### Performance Monitoring

- Set up Real User Monitoring (RUM) for animation performance
- Track Core Web Vitals for animated pages
- Monitor frame rate drops and optimize accordingly
- A/B test animation complexity vs engagement metrics

## Appendix

### Animation Timing Reference

| Animation Type | Duration | Delay | Easing |
|---------------|----------|-------|--------|
| Text Reveal | 0.5s | 0.06s/word | [0.22, 1, 0.36, 1] |
| Section Reveal | 0.7s | 0-0.2s | [0.22, 1, 0.36, 1] |
| Count Up | 1.4s | 0s | [0.22, 1, 0.36, 1] |
| FAQ Accordion | 0.32s | 0s | [0.22, 1, 0.36, 1] |
| Hover Effects | 0.3s | 0s | ease-out |
| Button Click | 0.15s | 0s | ease-in-out |
| Stagger Items | 0.5s | 0.08-0.12s | [0.22, 1, 0.36, 1] |
| Hero Load | 0.6s | 0.3s | ease-out |

### Browser Support Matrix

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14+ | Full |
| Edge | 90+ | Full |
| Chrome Mobile | 90+ | Full (reduced complexity) |
| Safari iOS | 14+ | Full (reduced complexity) |

### Design System Reference

**Colors**:
- `brand-dark`: #10302e
- `brand-cream`: #f7f5f0
- `brand-coral`: #ff6b6b
- `brand-mint`: #4ecdc4
- `brand-ink`: #1a1a1a

**Typography**:
- Serif: Cormorant Garamond
- Sans: Inter

**Spacing Scale**: 4px base unit (0.25rem)

**Border Radius**:
- `rounded-xl`: 0.75rem
- `rounded-2xl`: 1rem
- `rounded-full`: 9999px

**Shadows**:
- `shadow-soft`: subtle elevation
- `shadow-lift`: medium elevation for cards
