import { useAppDispatch, useAppSelector } from "../hooks";
import { Currency, selectCurrency, selectLanguage, setCurrency, setLanguage } from "./sessionSlice";
import { Locale } from "@/types/common/locale";
export const useSession = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const currency = useAppSelector(selectCurrency);

  return {
    // State
    language,
    currency,

    // Actions
    changeLanguage: (newLanguage: Locale) => dispatch(setLanguage(newLanguage)),
    changeCurrency: (newCurrency: Currency) => dispatch(setCurrency(newCurrency)),
  };
};
