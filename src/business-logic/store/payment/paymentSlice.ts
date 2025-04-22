import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Payments = "saldomax" | "creditcard" | "paypal" | "mercadopago";

export interface PaymentsState {
  selectedPaymentMethod: Payments;
}

const initialState: PaymentsState = {
  selectedPaymentMethod: "saldomax",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedPaymentMethod: (state, action: PayloadAction<Payments>) => {
      state.selectedPaymentMethod = action.payload;
    },
  },
});

// Export actions
export const { setSelectedPaymentMethod } = paymentSlice.actions;

// Export selectors
export const selectedPaymentMethod = (state: RootState) => state.payment.selectedPaymentMethod;

// Export reducer
export default paymentSlice.reducer;
