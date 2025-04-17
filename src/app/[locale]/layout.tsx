import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/types/common/locale";
import Providers from "@/providers";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AccessibilityBar from "@/components/AccessibilityBar";

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LocaleLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <Providers locale={locale}>
      <AccessibilityBar />
      <Header />
      {children}
      <Footer />
    </Providers>
  );
}
