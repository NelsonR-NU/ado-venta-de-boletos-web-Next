import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Locale } from "@/types/common/locale";

export type Currency = "MXN" | "USD" | "EUR";

export interface SessionState {
  language: Locale;
  currency: Currency;
}

const initialState: SessionState = {
  language: "es",
  currency: "MXN",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.language = action.payload;
    },
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});

// Export actions
export const { setLanguage, setCurrency } = sessionSlice.actions;

// Export selectors
export const selectLanguage = (state: RootState) => state.session.language;
export const selectCurrency = (state: RootState) => state.session.currency;

// Export reducer
export default sessionSlice.reducer;
