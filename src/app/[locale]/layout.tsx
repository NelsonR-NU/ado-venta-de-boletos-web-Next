import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/types/common/locale";
import Providers from "@/providers";
import { ReactNode } from "react";

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

  return <Providers locale={locale}>{children}</Providers>;
}
