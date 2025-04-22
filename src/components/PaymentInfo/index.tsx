"use client";

import React, { useState } from "react";
import Card from "../Card";
import { useTranslations } from "next-intl";
import InputField from "@/components/ui/Input";
import SaldoMaxModal from "@/components/SaldoMaxModal";
import Button  from "@/components/ui/Button"

const PaymentInfo: React.FC = () => {
  const t = useTranslations("payment_info");
  const [formData, setFormData] = useState({ cardNumber: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPin = (pin: string) => {
    console.log("PIN entered:", pin);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex gap-[18px]">
      <Card className="min-w-[361px]">
        <h1 className="text-xl font-semibold mb-4">Payment Method</h1>
      </Card>

      <Card className="min-w-[375px] bg-ado-white border border-ado-gray rounded-[10px] shadow-none">
        <span className="text-base">{t("card_prompt")}</span>
        <InputField
          label={
            <span className="text-xs font-semibold pb-[8px]">
              {t("card_number_balance_msg")}
            </span>
          }
          className="min-w-[327px] min-h-[45px] rounded-[4px] border pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[8px] bg-ado-snow-gray"
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="00 00 00 00"
        />

        <Button
          onClick={handleOpenModal}
          className="mt-4 w-full px-4 py-2 bg-ado-purple"
          variant="primary"
          buttonText={"Click Here"}
        />
      </Card>
      <SaldoMaxModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPin}
      />
    </div>
  );
};

export default PaymentInfo;
