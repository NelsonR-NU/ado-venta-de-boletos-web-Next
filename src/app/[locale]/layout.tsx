import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ClientProvider from "@/components/clientProvider";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${gothamProFont.variable} antialiased`}>
        <ClientProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
