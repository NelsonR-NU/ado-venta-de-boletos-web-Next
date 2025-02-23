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
        "ado-red": "#E11F2A",
        "ado-purple": "#5F2167",
        "ado-green": "#258910",
        "ado-light-green": "#87CE77",
        "ado-golden": "#D1820B",
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
    },
  },
  plugins: [],
} satisfies Config;
