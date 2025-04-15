import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlProviderProps } from "@/types/providers/NextIntl";

// Server Component - cannot use FC type with async functions
const NextIntlProvider = async ({ children, locale }: NextIntlProviderProps) => {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
