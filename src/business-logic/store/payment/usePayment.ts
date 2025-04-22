import { useAppDispatch, useAppSelector } from "../hooks";
import { Payments, setSelectedPaymentMethod, selectedPaymentMethod } from "./paymentSlice";
export const usePayment = () => {
  const dispatch = useAppDispatch();
  const selectedPayment = useAppSelector(selectedPaymentMethod);

  return {
    // State
    selectedPayment,
    // Actions
    onSelectedPaymentMethod: (newPayment: Payments) =>
      dispatch(setSelectedPaymentMethod(newPayment)),
  };
};
