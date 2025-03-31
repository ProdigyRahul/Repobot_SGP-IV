/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#441752",
          dark: "#A888B5",
        },
        background: {
          light: "#ffffff",
          dark: "#111827",
        },
        text: {
          light: "#441752",
          dark: "#ffffff",
        },
        accent: {
          light: "#A888B5",
          dark: "#441752",
        },
        muted: {
          light: "#6B7280",
          dark: "#9CA3AF",
        },
        border: {
          light: "#E5E7EB",
          dark: "#374151",
        },
        error: {
          light: "#fee2e2",
          dark: "#450a0a",
          text: {
            light: "#b91c1c",
            dark: "#fca5a5",
          },
        },
        success: {
          light: "#dcfce7",
          dark: "#14532d",
          text: {
            light: "#15803d",
            dark: "#4ade80",
          },
        },
      },
      boxShadow: {
        light:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        dark: "0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1280px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
