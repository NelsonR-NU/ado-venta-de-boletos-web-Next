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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'gotham-pro': ['var(--font-gotham-pro)', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
  plugins: [],
} satisfies Config;
