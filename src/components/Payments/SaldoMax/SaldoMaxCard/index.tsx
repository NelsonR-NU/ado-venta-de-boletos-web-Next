import React from "react";
import Image from "next/image";
import saldoMaxlogo from "@/assets/png/saldomaxIcon.png";
import activeIconLogo from "@/assets/png/activeIcon.png";
import { useTranslations } from "next-intl";

const SaldoMaxCard: React.FC = () => {
    const t = useTranslations("payment_info")
    return (
        <div className="flex flex-col h-fit gap-10 overflow-hidden">
            <div className="flex flex-col gap-2">
                <p className="text-lg font-bold leading-none">{t("pay_by_saldomax")}</p>
                <p className="text-base leading-tight">
                    {t("saldomax_card_content")}
                </p>
            </div>
            <div className="min-w-[332px]">
                <div className="flex items-center justify-between bg-ado-cool-gray border border-ado-soft-blue rounded-t-[15px] px-4 py-[7px]">
                    <div className="flex items-center gap-2">
                        <Image
                            src={activeIconLogo}
                            alt="Active Status Icon"
                            className="w-[14px] h-[20px] object-contain"
                        />
                        <span className="text-xs font-semibold leading-tight text-ado-black">{t("active")}</span>
                    </div>
                    <Image
                        src={saldoMaxlogo}
                        alt="Saldo Max Logo"
                        className="w-[55px] h-[35px] object-contain"
                    />
                </div>
                <div className="relative bg-ado-steal-blue flex flex-col gap-4 p-4 text-ado-background leading-tight overflow-hidden rounded-b-[15px]">
                    <div className="absolute -top-24 -right-[75px] w-40 h-40  border-[40px] border-ado-white-80 rounded-full z-[5]"></div>
                    <div className="flex justify-between relative z-10">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-normal">{t("card_expire")}</p>
                            <p className="font-bold text-sm">27 de abr. 2026</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-normal">{t("card_balance")}</p>
                            <p className="font-bold text-sm">$ 2,500.00 MXN</p>
                        </div>
                    </div>
                    <p className="relative z-10 text-base leading-tight font-bold">{t("max_balance")} Jimena</p>
                    <div className="flex justify-between relative z-10">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-normal">{t("card_number")}</p>
                            <p className="font-bold text-sm">09 32 74 01</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-normal">{t("last_transaction")}</p>
                            <p className="font-bold text-sm">Lun. 4 de oct. 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SaldoMaxCard;
