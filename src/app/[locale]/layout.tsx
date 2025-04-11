import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ClientProvider from "@/business-logic/provider";
import { Locale } from "@/types/common/locale";

const gothamProFont = localFont({
  src: [
    {
      path: "../../font/gothampro.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../font/gothampro_medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../font/gothampro_bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-gotham-pro",
});

export const metadata: Metadata = {
  title: "ADO",
  description: "ADO Venta de boletos",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!routing.locales.includes(await locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${gothamProFont.variable} antialiased`}>
        <ClientProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
