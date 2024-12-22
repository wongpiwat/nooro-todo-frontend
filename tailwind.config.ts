import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "#4EA8DE", // blue
          dark: "#1E6F9F", // blue-dark
        },
        secondary: {
          light: "#8284FA", // purple
          dark: "#5E60CE", // purple-dark
        },
        blue: "#007AFF",
        brown: "#A2845E",
        green: "#34C759",
        indigo: "#5856D6",
        orange: "#FF9500",
        pink: "#FF2D55",
        purple: "#AF52DE",
        red: "#FF3B30",
        yellow: "#FFCC00",
        gray: {
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#808080",
          400: "#333333",
          500: "#262626",
          600: "#1A1A1A",
          700: "#0D0D0D",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
