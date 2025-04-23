"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import DrawerModal from "../Drawer";
import OtpInput from "../ui/OtpInput";
import Image from "next/image";
import Link from "next/link";
import greenInfo from "@/assets/svg/Union.svg";

interface SaldoMaxModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pin: string) => void;
    isAuthenticated: boolean;
}

const SaldoMaxModal: React.FC<SaldoMaxModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isAuthenticated,
}) => {
    const t = useTranslations("payment_info");
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

    const isOtpComplete = otp.every((digit) => digit !== "");
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);


    const formattedTime = `00:${timeLeft.toString().padStart(2, "0")}`;

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
                title={
                    isAuthenticated ? t("verificationTitle") : t("pin")
                }
                closeLabel={t("close")}
                className="w-fit sm:w-[560px]"
            >
                <div className="flex-1 overflow-y-auto space-y-5 bg-ado-bg-light-gray p-6 flex-col">
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-bold">{t("saldo_heading")}</h2>
                            <p className="text-sm text-ado-text-gray">
                                {t("saldo_email_notice")}
                            </p>
                            <div className="flex flex-col bg-white rounded-lg shadow-md">
                                <div className="flex flex-col p-5 gap-4">
                                    <p className="text-base text-ado-text-gray">
                                        {t("verificationTitle")}
                                    </p>
                                    <p className="text-sm text-ado-text-gray">
                                        {t("verification_sent_to")}
                                        <span className="font-semibold text-black pl-2">jjimena.vinat@gmail.com</span>
                                    </p>
                                    <OtpInput
                                        label={t("verificationTitle")}
                                        length={6}
                                        value={otp}
                                        onChange={setOtp}
                                        onComplete={(val) => console.log("OTP Complete:", val)}
                                        inputClassName="border-gray-300 focus:ring-2 focus:ring-ado-selected"
                                        forgotPin={false}
                                    />
                                    <div className="text-sm space-y-2">
                                        <div className="flex items-center">
                                            <span className="text-sm text-ado-text-gray">{t("did_not_receive_email")}</span>
                                            <Link
                                                className={`text-base ml-2 underline ${timeLeft === 0 ? "text-ado-selected cursor-pointer" : "text-ado-selected cursor-not-allowed opacity-50"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (timeLeft === 0) {
                                                        setTimeLeft(30);
                                                    }
                                                }}
                                                href="#"
                                            >
                                                {t("resend_email")}
                                            </Link>

                                            <span className="font-semibold ml-3">{formattedTime}</span>
                                        </div>
                                        <div className="pt-4">{t("check_spam_folder")}</div>
                                    </div>
                                    <div className="py-8">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={!isOtpComplete}
                                            className="w-full py-2 rounded-sm text-base"
                                            variant="primary"
                                            buttonText={t("pay")}
                                        />
                                    </div>
                                    <p className="text-sm text-center">
                                        {t("needHelp")}{" "}
                                        <Link
                                            href="#"
                                            className="text-ado-selected font-medium underline pl-1"
                                        >
                                            {t("contactUs")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-semibold">{t("title")}</h2>
                            <div className="flex items-start gap-2 p-4 border border-ado-teal-border bg-ado-teal-blue rounded-md text-sm text-ado-teal">
                                <Image alt="info-icon" src={greenInfo} />
                                <div>
                                    <p className="font-semibold">{t("saldo_title")}</p>
                                    <p className="text-ado-text-gray">{t("description")}</p>
                                </div>
                            </div>
                            <div className="flex flex-col bg-white rounded-lg shadow-md">
                                <div className="flex flex-col p-5 gap-4">
                                    <div className="flex flex-col gap-[16px] text-sm text-ado-text-gray mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("totalPayable")}</span>
                                            <span className="text-sm font-bold">$2,130.00 MXN</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("currentBalance")}</span>
                                            <span className="text-sm font-bold">$2,500.00 MXN</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{t("finalBalance")}</span>
                                            <span className="text-sm font-bold">$370.00 MXN</span>
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
                                        forgotPin={true}
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
                                        <Link
                                            href="#"
                                            className="text-ado-selected font-medium pl-2"
                                        >
                                            {t("contactUs")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DrawerModal>
        </div>
    );
};

export default SaldoMaxModal;
