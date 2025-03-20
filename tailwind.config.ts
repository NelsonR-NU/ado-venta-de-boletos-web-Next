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
        "ado-white":"#FAFBFD",
        "ado-bg-light-gray":"#ECEFF6",
        "ado-btn-red":"#FF6633",
        "ado-text-black":"#1D1F24",
        "ado-sandal":"#FFF1DB",
        "ado-alert-border":"#FFD898",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "gotham-pro": ["var(--font-gotham-pro)", "sans-serif"],
      },
      screens: {
        xs: "480px",  
        sm: "640px",  
        md: "768px",  
        lg: "1024px",  
        xl: "1280px",  
        "2xl": "1536px",  
        "3xl": "1800px", 
        "max-xs": { max: "479px" },  
        "max-sm": { max: "639px" },  
        "max-md": { max: "767px" },  
        "max-lg": { max: "1023px" }, 
        "max-xl": { max: "1279px" },  
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
