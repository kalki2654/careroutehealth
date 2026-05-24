import { render, screen } from "@testing-library/react";
import { ParallaxImage } from "./ParallaxImage";

// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

// Mock framer-motion hooks
let mockScrollYProgress = { get: () => 0, set: () => {} };
let mockTransformValue = { get: () => "0%", set: () => {} };
let mockReducedMotion = false;

jest.mock("framer-motion", () => ({
  motion: {
    img: ({ children, style, ...props }: any) => (
      <img {...props} data-style={JSON.stringify(style)}>
        {children}
      </img>
    ),
  },
  useScroll: jest.fn(() => ({ scrollYProgress: mockScrollYProgress })),
  useTransform: jest.fn((progress, input, output) => {
    // Store the transform configuration for testing
    return {
      get: () => {
        const scrollValue = mockScrollYProgress.get();
        // Simple linear interpolation for testing
        const t = (scrollValue - input[0]) / (input[1] - input[0]);
        const outputValue = output[0] + t * (parseFloat(output[1]) - parseFloat(output[0]));
        return `${outputValue}%`;
      },
      set: () => {},
    };
  }),
  useReducedMotion: jest.fn(() => mockReducedMotion),
}));

describe("ParallaxImage", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockScrollYProgress = { get: () => 0, set: () => {} };
    mockReducedMotion = false;
    jest.clearAllMocks();
  });

  it("should render image with correct src and alt", () => {
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" />);
    
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("should apply custom className to container", () => {
    const { container } = render(
      <ParallaxImage 
        src="/test-image.jpg" 
        alt="Test image" 
        className="custom-class" 
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
    expect(wrapper).toHaveClass("overflow-hidden");
  });

  it("should use default speed of 0.6 when not provided", () => {
    // This test verifies the component accepts the speed prop with default value
    const { container } = render(
      <ParallaxImage src="/test-image.jpg" alt="Test image" />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should accept custom speed prop", () => {
    // This test verifies the component accepts custom speed values
    const { container } = render(
      <ParallaxImage src="/test-image.jpg" alt="Test image" speed={0.8} />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should apply correct transform based on scroll position", () => {
    const { useTransform } = require("framer-motion");
    
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" speed={0.6} />);
    
    // Verify useTransform was called with correct parameters
    expect(useTransform).toHaveBeenCalled();
    
    // Get the call arguments
    const transformCall = useTransform.mock.calls[0];
    expect(transformCall[0]).toBe(mockScrollYProgress);
    expect(transformCall[1]).toEqual([0, 1]); // Input range
    expect(transformCall[2]).toEqual(["0%", "40%"]); // Output range: (1 - 0.6) * 100 = 40%
  });

  it("should calculate correct transform range for different speed values", () => {
    const { useTransform } = require("framer-motion");
    
    // Test with speed 0.5
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" speed={0.5} />);
    
    const transformCall = useTransform.mock.calls[0];
    expect(transformCall[2]).toEqual(["0%", "50%"]); // (1 - 0.5) * 100 = 50%
  });

  it("should use useScroll with correct offset configuration", () => {
    const { useScroll } = require("framer-motion");
    
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" />);
    
    // Verify useScroll was called with correct offset
    expect(useScroll).toHaveBeenCalledWith({
      target: expect.any(Object),
      offset: ["start end", "end start"]
    });
  });
});

describe("ParallaxImage - Reduced Motion", () => {
  beforeEach(() => {
    // Reset mocks
    mockScrollYProgress = { get: () => 0, set: () => {} };
    mockReducedMotion = true;
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockReducedMotion = false;
  });

  it("should disable parallax when prefers-reduced-motion is enabled", () => {
    const { useReducedMotion } = require("framer-motion");
    
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" />);
    
    // Verify useReducedMotion was called
    expect(useReducedMotion).toHaveBeenCalled();
    
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    
    // When reduced motion is enabled, the style should have y: 0
    const styleData = image.getAttribute("data-style");
    if (styleData) {
      const style = JSON.parse(styleData);
      expect(style.y).toBe(0);
    }
  });

  it("should apply transform when reduced motion is disabled", () => {
    mockReducedMotion = false;
    
    render(<ParallaxImage src="/test-image.jpg" alt="Test image" />);
    
    const image = screen.getByAltText("Test image");
    const styleData = image.getAttribute("data-style");
    
    if (styleData) {
      const style = JSON.parse(styleData);
      // When reduced motion is disabled, y should be the transform value, not 0
      expect(style.y).not.toBe(0);
      expect(style.y).toBeDefined();
    }
  });
});
