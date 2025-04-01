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
        "ado-background": "#FFFFFF",
        "ado-border-green": "#87CE77",
        "ado-date-select": "#E7F7E4",
        "ado-date-background": "#FAFAFA",
        "ado-scroll-background": "#F1F3F9",
        "ado-background-secondary": "#F4F6F9",
        "ado-neutral-light": "#B5BAC7",
        "ado-search-border": "#E5E9EE",
        "ado-selected": "#5F2167",
        "ado-red": "#E11F2A",
        "ado-purple": "#5F2167",
        "ado-royal-purple": "#622366",
        "ado-green": "#258910",
        "ado-teal": "#169A8E",
        "ado-light-green": "#87CE77",
        "ado-text-gray": "#1D1F24",
        "ado-text-white": "#F6F7FB",
        "ado-golden": "#D1820B",
        "ado-white": "#FAFBFD",
        "ado-bg-light-gray": "#ECEFF6",
        "ado-sandal": "#FFF1DB",
        "ado-alert-border": "#FFD898",
        "ado-gray": "#E3E7F2",
        "ado-charcoal": "#1D1F24",
        "ado-steel-gray": "#6F7587",
        "ado-frost-gray": "#E3E7F2",
        "ado-ice-blue": "#F6F7FB",
        "ado-slate-gray": "#595E6D",
        "ado-light-blue-gray": "#E8EBF4",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "gotham-pro": ["var(--font-gotham-pro)", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      boxShadow: {
        charcoal: "0px 8px 16px 0px rgba(13, 14, 15, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
