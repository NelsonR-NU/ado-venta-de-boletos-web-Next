import React, { FC } from "react";
import { useTranslations } from "next-intl";
import InputField from "@/components/ui/Input";
import Card from "@/components/Card"
import Image from "next/image"
import info from "@/assets/svg/tooltip.svg"
import cardIcon from "@/assets/svg/cc-card.svg"

interface CardPaymentFormProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardPaymentForm: FC<CardPaymentFormProps> = ({ onSubmit }) => {
    const t = useTranslations("card_payment");

    console.log(t)

    return (
        <Card className="w-full min-h-[399px] bg-ado-white border border-ado-gray rounded-[10px] shadow-none space-y-4">
            <h2 className="text-lg font-semibold text-ado-charcoal">{t("title")}</h2>
            <p className="text-base text-ado-charcoal">{t("subtitle")}</p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="relative w-full">
                    <Image
                        src={cardIcon}
                        alt="card-icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-[45px] transform -translate-y-1/2"
                    />
                    <InputField
                        label={<span className="text-xs">{t("card_number")}</span>}
                        name="cardNumber"
                        placeholder={t("card_number_placeholder")}
                        className="pl-10 w-full"
                    />
                </div>

                <InputField
                    label={<span className="text-xs">{t("card_holder_name")}</span>}
                    name="cardHolder"
                    placeholder={t("card_holder_name_placeholder")}
                    className="w-full"
                />

                <div className="flex gap-4">
                    <InputField
                        label={<span className="text-xs">{t("expiry_date")}</span>}
                        name="expiry"
                        placeholder={t("expiry_date_placeholder")}
                        className="w-[173px]"
                    />

                    <div className="w-full relative">
                        <label className="block text-sm font-medium text-gray-700 flex items-center justify-between">
                            {t("cvv")}
                            <span className="group relative">
                                <Image alt="info" src={info} />
                                <div className="absolute hidden group-hover:block bg-white text-gray-700 border border-gray-200 shadow-lg rounded-md p-3 text-xs w-60 right-0 top-full mt-1 z-10">
                                    <p className="font-semibold">{t("card_payment.cvv_info_title")}</p>
                                    <p>{t("cvv_info_text")}</p>
                                </div>
                            </span>
                        </label>
                        <InputField
                            name="cvv"
                            placeholder={t("cvv_placeholder")}
                            className="w-[173px]"
                        />
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default CardPaymentForm;
