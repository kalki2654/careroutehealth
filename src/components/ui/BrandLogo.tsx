import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function BrandLogo({ className, variant = "dark" }: BrandLogoProps) {
  const accentColor = variant === "light" ? "#10302E" : "#FFFFFF";
  const gapColor = variant === "light" ? "#FFFFFF" : "#10302E";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full shadow-soft",
        variant === "light" ? "bg-white" : "bg-brand-dark",
        className
      )}
    >
      <svg viewBox="0 0 64 64" className="h-[74%] w-[74%]" fill="none" role="img">
        <path
          d="M18 30C18 20 28 18 32 29C36 18 46 20 46 30C46 39 38 43 32 49C26 43 18 39 18 30Z"
          stroke="#E08C71"
          strokeWidth="5.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 36C24 24 40 24 46 36"
          stroke={gapColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 36C24 24 40 24 46 36"
          stroke="#DCEFE7"
          strokeWidth="4.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 28C24 40 40 40 46 28"
          stroke={gapColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 28C24 40 40 40 46 28"
          stroke="#E08C71"
          strokeWidth="4.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M32 25V39M25 32H39" stroke={accentColor} strokeWidth="3.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
