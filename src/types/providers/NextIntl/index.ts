import { ReactNode } from "react";
import { Locale } from "@/types/common/locale";

export interface NextIntlProviderProps {
  children: ReactNode;
  locale: Locale;
}
