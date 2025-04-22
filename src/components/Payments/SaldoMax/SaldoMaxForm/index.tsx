"use client";

import InputField from "@/components/ui/Input";
import React from "react";
import { useTranslations } from "next-intl";

const SaldoMaxForm: React.FC = () => {
    const t = useTranslations('payment_info')
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <p className="text-lg font-bold leading-none">{t("pay_by_saldomax")}</p>
                <p className="text-base leading-tight">
                    {t("saldomax_form_content")}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold leading-none">  {t("saldomax_form_label")}</p>
                <InputField
                    name={"accountNumber"}
                    placeholder={"00 00 00 00"}
                    className="ado-snow-gray !rounded-[4px] py-[14px] px-[16px] border-ado-gray"
                />
            </div>
        </div>
    );
};

export default SaldoMaxForm;
