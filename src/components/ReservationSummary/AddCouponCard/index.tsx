"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/Input";
import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface AddCouponCardProps {}

const AddCouponCard: React.FC<AddCouponCardProps> = () => {
  const t = useTranslations("reservationSummary");
  const [couponCode, setCouponCode] = useState<string>("");

  const handleApplyCoupon = () => {
    //TODO: Add the Logic to apply the coupon code
    console.log("Applying coupon code:", couponCode);
  };

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="text-black">{t("discountCoupon")}</div>
        <InputField
          name="coupon"
          placeholder="Ej:01234ADOs"
          type="text"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <Button
          buttonText={t("apply")}
          disabled={couponCode.length === 0}
          onClick={handleApplyCoupon}
        />
      </div>
    </Card>
  );
};

export default AddCouponCard;
