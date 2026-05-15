import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F7F5F0",
          dark: "#10302E",
          coral: "#E08C71",
          ink: "#1A1A1A",
          muted: "#6E7672",
          border: "rgba(16, 48, 46, 0.1)",
          mint: "#DCEFE7"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(16, 48, 46, 0.12)",
        lift: "0 28px 80px rgba(16, 48, 46, 0.18)"
      },
      maxWidth: {
        site: "1440px"
      }
    }
  },
  plugins: []
};

export default config;
