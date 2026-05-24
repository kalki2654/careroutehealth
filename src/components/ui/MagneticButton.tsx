"use client";

import { motion, type HTMLMotionProps, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MagneticButtonBaseProps = {
  children: ReactNode;
  variant?: "dark" | "coral" | "light" | "outline";
  showIcon?: boolean;
};

type MagneticButtonAsLink = MagneticButtonBaseProps & Omit<HTMLMotionProps<"a">, "children" | "onMouseMove" | "onMouseLeave"> & {
  href: string;
  onClick?: never;
};

type MagneticButtonAsButton = MagneticButtonBaseProps & Omit<HTMLMotionProps<"button">, "children" | "onMouseMove" | "onMouseLeave"> & {
  onClick: () => void;
  href?: never;
};

type MagneticButtonProps = MagneticButtonAsLink | MagneticButtonAsButton;

const variants = {
  dark: "bg-brand-dark text-white shadow-soft",
  coral: "bg-brand-coral text-brand-ink shadow-soft",
  light: "bg-white text-brand-dark shadow-soft",
  outline: "border border-white/35 bg-transparent text-white"
};

export function MagneticButton({
  className,
  children,
  variant = "dark",
  showIcon = true,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.25 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };

  const handleLeave = (_event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    x.set(0);
    y.set(0);
  };

  const baseClassName = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-coral focus:ring-offset-2 focus:ring-offset-brand-cream",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon ? <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.4} /> : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <motion.a
        style={{ x: springX, y: springY }}
        className={baseClassName}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...(props as any)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      className={baseClassName}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}
