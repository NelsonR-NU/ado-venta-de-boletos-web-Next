"use client"

import PaymentDetails from "@/components/Payments/PaymentDetails";
import PaymentMethodTabs from "@/components/Payments/PaymentMethodTabs";

export default function Payment() {

  return (
    <div className="w-full flex gap-[18px]">
      <PaymentMethodTabs />
      <PaymentDetails />
    </div>
  );
}
