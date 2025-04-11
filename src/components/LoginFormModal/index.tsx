"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import RegisterFormModal from "@/components/RegisterFormModal";

const LoginFormModal: React.FC = () => {
    const t = useTranslations("login");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const isFormValid = formData.email && formData.password;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleOpenRegisterModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const handleBackToLogin = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const handleClosePopup = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pb-2">
            <Button
                variant="primary"
                className="border border-ado-purple"
                buttonText="Click"
                onClick={() => setIsLoginModalOpen(true)}
            />
            <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
                <div className="border-b border-ado-neutral-light">
                    <h2 className="font-bold text-[18px] text-ado-charcoal">
                        {t('login_text')}
                    </h2>
                    <p className="text-sm text-ado-charcoal my-5">{t("track_trip_history")}</p>
                </div>
                <form className="space-y-4 my-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label={<span className="text-xs">{t("email")}</span>}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('ex_email')}
                        />
                        <InputField
                            label={<span className="text-xs">{t("password")}</span>}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t('enter_password')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Link href="#" className="text-ado-royal-purple underline font-semibold mx-1">
                            {t("forgot_password")}
                        </Link>
                    </div>
                    <Button
                        className={`w-[267px] h-[43px] rounded-[4px] px-[52px] py-[12px] gap-[8px] flex items-center justify-center
                            ${isFormValid ? "!bg-ado-purple !text-white" : "!bg-ado-gray !text-ado-slate-gray"}
                        `}
                        disabled={!isFormValid}
                        buttonText={t("continue")}
                    />
                    <div>
                        <p className="text-gray-600 text-sm">
                            {t('first_time')}
                            <span
                                className="text-ado-purple font-semibold underline mx-2 text-base cursor-pointer"
                                onClick={handleOpenRegisterModal}
                            >
                                {t('register')}
                            </span>
                        </p>
                        <div className="text-ado-purple font-semibold underline block my-7 text-base cursor-pointer" onClick={handleClosePopup}>
                            {t('enter_as_guest')}
                        </div>
                    </div>
                </form>
            </Modal>

            <RegisterFormModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onBackToLogin={handleBackToLogin}
            />
        </div>
    );
};

export default LoginFormModal;