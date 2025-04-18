import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/providers";
import { Locale } from "@/types/common/locale";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AccessibilityBar from "@/components/AccessibilityBar";
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

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;

  return (
    <html>
      <body className={`${gothamProFont.variable} antialiased`}>
        <Providers locale={locale}>
          <AccessibilityBar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
