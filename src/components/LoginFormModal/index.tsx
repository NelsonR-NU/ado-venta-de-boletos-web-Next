"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import Button from "../Button";
import InputField from "../Input";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginFormModal: React.FC = () => {
    const t = useTranslations("login");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        receivePromotions: false,
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pb-2">
            <Button
                variant="primary"
                className="border border-ado-purple"
                buttonText="Click"
                onClick={() => setIsModalOpen(true)}
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseIcon={true}>
                <div className="border-b border-ado-neutral-light">
                    <h2 className="font-bold text-[18px] text-ado-charcoal">
                        {t('login_text')}
                    </h2>
                    <p className="text-sm text-ado-charcoal my-5">{t("track_trip_history")}</p>
                </div>
                <form className="space-y-4 my-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label={
                                <span className="text-xs">{t("email")}</span>
                            }
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej:mar.tg@gmail.com"
                        />
                        <InputField
                            label={
                                <span className="text-xs">{t("password")}</span>
                            }
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder={t('enter_password')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Link href="#" className="text-ado-royal-purple underline font-semibold mx-1">{t("forgot_password")}</Link>
                    </div>
                    <Button
                        width={312}
                        className="w-[312px] h-[43px] !bg-ado-gray !text-ado-slate-gray rounded-[4px] px-[52px] py-[12px] gap-[8px] flex items-center justify-center"
                        disabled={!formData.agreeTerms}
                        buttonText={t("continue")}
                    />
                    <div>
                        <p className="text-gray-600 text-sm">
                            {t('first_time')}
                            <Link href="/register" className="text-ado-purple font-semibold underline mx-2 text-base">
                                {t('register')}
                            </Link>
                        </p>
                        <Link href="/guest-login" className="text-ado-purple font-semibold underline block my-7 text-base">
                            {t('enter_as_guest')}
                        </Link>
                    </div>

                </form>
            </Modal>
        </div>
    );
};

export default LoginFormModal;