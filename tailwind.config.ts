import type { Config } from "tailwindcss";

const palette = {
  ink: "#19352d",
  cream: "#f5f4ec",
  sand: "#e4e9dc",
  olive: "#2f604a",
  moss: "#698273",
  ember: "#3f765b",
  wine: "#22483b",
  gold: "#c4a15e",
} as const;

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...palette,
        "brand-primary": palette.ember,
        "brand-primary-hover": palette.olive,
        "brand-secondary": palette.ink,
        "brand-dark": palette.wine,
        accent: palette.gold,
        "accent-soft": "#d8bd7d",
        "accent-light": "#efd79f",
        background: palette.cream,
        surface: "#ffffff",
        "surface-muted": palette.sand,
        "surface-elevated": "#fbfaf6",
        "text-primary": palette.ink,
        "text-secondary": "rgb(25 53 45 / 0.75)",
        muted: "rgb(25 53 45 / 0.60)",
        border: "rgb(25 53 45 / 0.10)",
        "border-strong": "rgb(25 53 45 / 0.18)",
        "border-inverse": "rgb(255 255 255 / 0.10)",
        "border-inverse-strong": "rgb(255 255 255 / 0.35)",
        "surface-inverse": "rgb(255 255 255 / 0.05)",
        "surface-inverse-hover": "rgb(255 255 255 / 0.07)",
        "overlay-soft": "rgb(25 53 45 / 0.60)",
        "overlay-strong": "rgb(25 53 45 / 0.85)",
        "focus-ring": "rgb(63 118 91 / 0.12)",
        whatsapp: "#1f8f5f",
        "whatsapp-hover": "#18744d",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 8vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-1-compact": ["clamp(2.625rem, 8vw, 4.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.125rem, 4.5vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-3": ["clamp(1.625rem, 3vw, 2.25rem)", { lineHeight: "1.12" }],
        body: ["1rem", { lineHeight: "1.625" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        label: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.06em" }],
      },
      spacing: {
        "section-sm": "4rem",
        section: "5.5rem",
        "section-lg": "7rem",
      },
      borderRadius: {
        control: "0.75rem",
        card: "1.25rem",
        media: "1.25rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 12px 32px rgb(25 53 45 / 0.10)",
        elevated: "0 20px 48px rgb(25 53 45 / 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
