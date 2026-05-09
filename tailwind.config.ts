import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bark: "#2f241f",
        moss: "#47624f",
        sage: "#e4eee4",
        blush: "#f5dad2",
        ink: "#18201b",
        navy: "#071f49",
        navySoft: "#102f68",
        cream: "#fff3e5",
        gold: "#e1a451"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(47, 36, 31, 0.16)"
      }
    }
  },
  plugins: []
} satisfies Config;
