import { ReactNode } from "react";
import { FC } from "react";
import RTKProvider from "./Redux";
import NextIntlProvider from "@/providers/NextIntl";
import { Locale } from "@/types/common/locale";

const Providers: FC<{ children: ReactNode; locale: Locale }> = ({ children, locale }) => (
  <RTKProvider>
    <NextIntlProvider locale={locale}>{children}</NextIntlProvider>
  </RTKProvider>
);

export default Providers;
