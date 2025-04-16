import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

const gothamProFont = localFont({
  src: [
    {
      path: "../font/gothampro.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/gothampro_medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../font/gothampro_bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-gotham-pro",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "ADO | Venta de boletos",
  description: "Compra boletos de autobús fácilmente con ADO",
  icons: {
    icon: "favicon.ico",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={`${gothamProFont.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
