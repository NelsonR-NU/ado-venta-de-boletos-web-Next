"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import DrawerModal from "../Drawer";
import OtpInput from "../ui/OtpInput";
import Image from "next/image";
import Link from "next/link";
import greenInfo from "@/assets/svg/Union.svg"

interface SaldoMaxModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pin: string) => void;
}

const SaldoMaxModal: React.FC<SaldoMaxModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const t = useTranslations("payment_info");
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Check if all OTP digits are entered
    const isOtpComplete = otp.every((digit) => digit !== "");

    const handleSubmit = () => {
        if (isOtpComplete) {
            onSubmit(otp.join(""));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10]">
            <DrawerModal
                isOpen={isOpen}
                onClose={onClose}
                title={t("pin")}
                closeLabel={t("close")}
                className="w-fit sm:w-[560px]"
            >
                <div className="flex-1 overflow-y-auto space-y-5 bg-ado-bg-light-gray p-6 flex-col">
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-lg font-semibold">{t("title")}</h2>
                        <div className="flex items-start gap-2 p-4 border border-ado-teal-border  bg-ado-teal-blue rounded-md text-sm text-ado-teal">
                            <Image alt="info-icon" src={greenInfo} />
                            <div>
                                <p className="font-semibold">{t("saldo_title")}</p>
                                <p className="text-ado-text-gray">{t("description")}</p>
                            </div>
                        </div>

                        <div className="flex flex-col bg-white rounded-lg shadow-md">
                            <div className="flex flex-col p-5 gap-4">
                                <div className="p-5 flex-col">
                                    <div className="flex flex-col gap-[16px] text-sm text-ado-text-gray mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("totalPayable")}</span>
                                            <span className="text-sm font-bold text-right">$2,130.00 MXN</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("currentBalance")}</span>
                                            <span className="text-sm font-bold text-right">$2,500.00 MXN</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("finalBalance")}</span>
                                            <span className="text-sm font-bold text-right">$370.00 MXN</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-ado-neutral-light my-4" />

                                    <OtpInput
                                        length={4}
                                        value={otp}
                                        onChange={setOtp}
                                        onComplete={(val) => console.log("OTP Complete:", val)}
                                        inputClassName="border-gray-300 focus:ring-2 focus:ring-ado-selected"
                                        label="Enter OTP"
                                        forgotPinText="Forgot your code?"
                                        forgotPinLink="/reset"
                                    />

                                    <div className="p-4">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={!isOtpComplete}
                                            className="w-full py-2 rounded-sm text-base"
                                            variant="primary"
                                            buttonText={t("continue")}
                                        />
                                    </div>
                                    <p className="text-sm text-center underline decoration-ado-selected">
                                        {t("needHelp")}
                                        <Link href="#" className="text-ado-selected font-medium pl-2">{t("contactUs")}</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerModal>
        </div>
    );
};

export default SaldoMaxModal;
