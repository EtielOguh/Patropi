import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#19352d",
        cream: "#f5f4ec",
        sand: "#e4e9dc",
        olive: "#2f604a",
        moss: "#698273",
        ember: "#3f765b",
        wine: "#22483b",
        gold: "#c4a15e",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(25,53,45,.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
