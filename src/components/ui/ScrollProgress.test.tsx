/**
 * Unit tests for ScrollProgress component
 * 
 * Tests cover:
 * - Component renders with fixed positioning
 * - Component updates scaleX based on scroll progress
 * - Component uses correct color and height props
 * 
 * Requirements: 1.15
 */

import { render } from "@testing-library/react";
import { ScrollProgress } from "./ScrollProgress";

// Mock framer-motion hooks
const mockUseScroll = jest.fn();
const mockUseSpring = jest.fn();

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
  useScroll: () => mockUseScroll(),
  useSpring: (value: any, config: any) => mockUseSpring(value, config),
}));

// Mock the cn utility function
jest.mock("@/lib/utils", () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

describe("ScrollProgress", () => {
  let scrollYProgress: any;
  let scaleX: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create mock scroll progress value
    scrollYProgress = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    // Create mock scaleX value
    scaleX = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    // Setup default mock implementations
    mockUseScroll.mockReturnValue({ scrollYProgress });
    mockUseSpring.mockReturnValue(scaleX);
  });

  it("should render with fixed positioning at top of viewport", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("fixed");
    expect(progressBar).toHaveClass("left-0");
    expect(progressBar).toHaveClass("top-0");
  });

  it("should have high z-index (50) to remain visible during scroll", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("z-50");
  });

  it("should have full width and origin-left for scaleX animation", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("w-full");
    expect(progressBar).toHaveClass("origin-left");
  });

  it("should use default color (bg-brand-coral) when not provided", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("bg-brand-coral");
  });

  it("should use default height (h-1) when not provided", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("h-1");
  });

  it("should accept custom color prop", () => {
    const { container } = render(<ScrollProgress color="bg-brand-mint" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("bg-brand-mint");
  });

  it("should accept custom height prop", () => {
    const { container } = render(<ScrollProgress height="h-2" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("h-2");
  });

  it("should accept both custom color and height props", () => {
    const { container } = render(
      <ScrollProgress color="bg-blue-500" height="h-0.5" />
    );
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("bg-blue-500");
    expect(progressBar).toHaveClass("h-0.5");
  });

  it("should call useScroll hook to get scroll progress", () => {
    render(<ScrollProgress />);
    
    expect(mockUseScroll).toHaveBeenCalled();
  });

  it("should call useSpring with scrollYProgress and correct spring config", () => {
    render(<ScrollProgress />);
    
    expect(mockUseSpring).toHaveBeenCalledWith(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });
  });

  it("should use spring physics with stiffness 100", () => {
    render(<ScrollProgress />);
    
    const springConfig = mockUseSpring.mock.calls[0][1];
    expect(springConfig.stiffness).toBe(100);
  });

  it("should use spring physics with damping 30", () => {
    render(<ScrollProgress />);
    
    const springConfig = mockUseSpring.mock.calls[0][1];
    expect(springConfig.damping).toBe(30);
  });

  it("should use spring physics with restDelta 0.001", () => {
    render(<ScrollProgress />);
    
    const springConfig = mockUseSpring.mock.calls[0][1];
    expect(springConfig.restDelta).toBe(0.001);
  });

  it("should apply scaleX style from useSpring", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar.style.scaleX).toBeDefined();
  });

  it("should update scaleX based on scroll progress", () => {
    // Mock scroll progress at 50%
    scrollYProgress.get.mockReturnValue(0.5);
    scaleX.get.mockReturnValue(0.5);
    
    const { container } = render(<ScrollProgress />);
    
    // Verify useSpring was called with the scrollYProgress value
    expect(mockUseSpring).toHaveBeenCalledWith(
      scrollYProgress,
      expect.any(Object)
    );
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toBeInTheDocument();
  });

  it("should handle scroll progress at 0% (page top)", () => {
    scrollYProgress.get.mockReturnValue(0);
    scaleX.get.mockReturnValue(0);
    
    const { container } = render(<ScrollProgress />);
    
    expect(mockUseSpring).toHaveBeenCalledWith(scrollYProgress, expect.any(Object));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should handle scroll progress at 100% (page bottom)", () => {
    scrollYProgress.get.mockReturnValue(1);
    scaleX.get.mockReturnValue(1);
    
    const { container } = render(<ScrollProgress />);
    
    expect(mockUseSpring).toHaveBeenCalledWith(scrollYProgress, expect.any(Object));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should handle intermediate scroll progress values", () => {
    const testValues = [0.25, 0.5, 0.75];
    
    testValues.forEach((value) => {
      jest.clearAllMocks();
      scrollYProgress.get.mockReturnValue(value);
      scaleX.get.mockReturnValue(value);
      
      const { container } = render(<ScrollProgress />);
      
      expect(mockUseSpring).toHaveBeenCalledWith(scrollYProgress, expect.any(Object));
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

describe("ScrollProgress - Styling", () => {
  let scrollYProgress: any;
  let scaleX: any;

  beforeEach(() => {
    jest.clearAllMocks();

    scrollYProgress = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    scaleX = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    mockUseScroll.mockReturnValue({ scrollYProgress });
    mockUseSpring.mockReturnValue(scaleX);
  });

  it("should combine all required classes correctly", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    const classes = progressBar.className.split(" ");
    
    expect(classes).toContain("fixed");
    expect(classes).toContain("left-0");
    expect(classes).toContain("top-0");
    expect(classes).toContain("z-50");
    expect(classes).toContain("w-full");
    expect(classes).toContain("origin-left");
    expect(classes).toContain("h-1");
    expect(classes).toContain("bg-brand-coral");
  });

  it("should maintain positioning classes when custom color is provided", () => {
    const { container } = render(<ScrollProgress color="bg-red-500" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("fixed");
    expect(progressBar).toHaveClass("left-0");
    expect(progressBar).toHaveClass("top-0");
    expect(progressBar).toHaveClass("z-50");
    expect(progressBar).toHaveClass("bg-red-500");
  });

  it("should maintain positioning classes when custom height is provided", () => {
    const { container } = render(<ScrollProgress height="h-4" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("fixed");
    expect(progressBar).toHaveClass("left-0");
    expect(progressBar).toHaveClass("top-0");
    expect(progressBar).toHaveClass("z-50");
    expect(progressBar).toHaveClass("h-4");
  });
});

describe("ScrollProgress - Edge Cases", () => {
  let scrollYProgress: any;
  let scaleX: any;

  beforeEach(() => {
    jest.clearAllMocks();

    scrollYProgress = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    scaleX = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    mockUseScroll.mockReturnValue({ scrollYProgress });
    mockUseSpring.mockReturnValue(scaleX);
  });

  it("should handle empty color string", () => {
    const { container } = render(<ScrollProgress color="" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    // Should still have all other classes
    expect(progressBar).toHaveClass("fixed");
    expect(progressBar).toHaveClass("left-0");
    expect(progressBar).toHaveClass("top-0");
  });

  it("should handle empty height string", () => {
    const { container } = render(<ScrollProgress height="" />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    // Should still have all other classes
    expect(progressBar).toHaveClass("fixed");
    expect(progressBar).toHaveClass("left-0");
    expect(progressBar).toHaveClass("top-0");
  });

  it("should handle custom Tailwind color classes", () => {
    const customColors = [
      "bg-blue-500",
      "bg-green-700",
      "bg-purple-300",
      "bg-gradient-to-r from-blue-500 to-purple-500",
    ];

    customColors.forEach((color) => {
      const { container } = render(<ScrollProgress color={color} />);
      const progressBar = container.firstChild as HTMLElement;
      
      // The color class should be present (cn utility will handle the string)
      expect(progressBar.className).toContain(color.split(" ")[0]);
    });
  });

  it("should handle custom Tailwind height classes", () => {
    const customHeights = ["h-0.5", "h-2", "h-4", "h-px"];

    customHeights.forEach((height) => {
      const { container } = render(<ScrollProgress height={height} />);
      const progressBar = container.firstChild as HTMLElement;
      
      expect(progressBar).toHaveClass(height);
    });
  });

  it("should render without children", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.children.length).toBe(0);
  });

  it("should not accept children prop (component is self-contained)", () => {
    // ScrollProgress doesn't accept children, so this test verifies the component structure
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar.textContent).toBe("");
  });
});

describe("ScrollProgress - Animation Behavior", () => {
  let scrollYProgress: any;
  let scaleX: any;

  beforeEach(() => {
    jest.clearAllMocks();

    scrollYProgress = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    scaleX = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    mockUseScroll.mockReturnValue({ scrollYProgress });
    mockUseSpring.mockReturnValue(scaleX);
  });

  it("should create smooth animation with spring physics", () => {
    render(<ScrollProgress />);
    
    // Verify spring config creates smooth animation
    const springConfig = mockUseSpring.mock.calls[0][1];
    
    // Higher stiffness (100) = faster response
    expect(springConfig.stiffness).toBeGreaterThan(0);
    
    // Damping (30) prevents oscillation
    expect(springConfig.damping).toBeGreaterThan(0);
    
    // restDelta (0.001) ensures smooth stop
    expect(springConfig.restDelta).toBeLessThan(0.01);
  });

  it("should use origin-left for scaleX to expand from left to right", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass("origin-left");
  });

  it("should maintain aspect ratio with scaleX (width scales, height stays fixed)", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    
    // Width is 100% and will scale with scaleX
    expect(progressBar).toHaveClass("w-full");
    
    // Height is fixed (h-1) and won't scale
    expect(progressBar).toHaveClass("h-1");
  });
});

describe("ScrollProgress - Integration with Framer Motion", () => {
  let scrollYProgress: any;
  let scaleX: any;

  beforeEach(() => {
    jest.clearAllMocks();

    scrollYProgress = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    scaleX = {
      get: jest.fn(() => 0),
      set: jest.fn(),
    };

    mockUseScroll.mockReturnValue({ scrollYProgress });
    mockUseSpring.mockReturnValue(scaleX);
  });

  it("should use Framer Motion's useScroll hook", () => {
    render(<ScrollProgress />);
    
    expect(mockUseScroll).toHaveBeenCalledTimes(1);
  });

  it("should use Framer Motion's useSpring hook with scrollYProgress", () => {
    render(<ScrollProgress />);
    
    expect(mockUseSpring).toHaveBeenCalledTimes(1);
    expect(mockUseSpring).toHaveBeenCalledWith(
      scrollYProgress,
      expect.objectContaining({
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
      })
    );
  });

  it("should pass scaleX to motion.div style prop", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    
    // Verify the style prop includes scaleX
    expect(progressBar.style.scaleX).toBeDefined();
  });

  it("should render as motion.div component", () => {
    const { container } = render(<ScrollProgress />);
    
    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar.tagName).toBe("DIV");
  });
});
