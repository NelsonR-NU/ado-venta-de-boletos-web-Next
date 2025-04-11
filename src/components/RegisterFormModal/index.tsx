"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import Checkbox from "../ui/CheckBox";
import Link from "next/link";
import Image from "next/image";
import leftChevron from "@/assets/svg/left-chevron.svg"

interface RegisterFormModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onBackToLogin?: () => void;
}

const RegisterFormModal: React.FC<RegisterFormModalProps> = ({
    isOpen,
    onClose,
    onBackToLogin
}) => {
    const t = useTranslations("register");
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        receivePromotions: false,
        agreeTerms: false,
    });

    const isFormValid = formData.name && formData.lastName && formData.email && formData.agreeTerms;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseIcon={false}>
            <div>
                <div className="flex items-center gap-4">
                    <button onClick={onBackToLogin}>
                        <Image
                            src={leftChevron}
                            alt="left chevron"
                            className="w-[16px]"
                        />
                    </button>
                    <h2 className="font-bold text-[18px] text-ado-charcoal py-2">
                        {t('register')}
                    </h2>
                </div>
            </div>
            <form className="space-y-4 my-4">
                <p className="text-sm text-ado-charcoal">{t("enter_details")}</p>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label={t("first_name")}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('ex_firstName')}
                    />
                    <InputField
                        label={t("last_name")}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder={t('ex_lastName')}
                    />
                </div>
                <InputField
                    label={t("email")}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('ex_email')}
                    required
                />
                <div className="space-y-2">
                    <Checkbox
                        label={
                            <span className="text-xs">{t("receive_promotions")}</span>
                        }
                        name="receivePromotions"
                        checked={formData.receivePromotions}
                        onChange={handleChange}
                    />
                    <Checkbox
                        label={
                            <span className="text-xs">
                                {t("agree_terms")}
                                <Link href="#" className="text-ado-royal-purple underline mx-1">{t("terms_conditions")}</Link>
                                {t("as_well_as_the")}
                                <Link href="#" className="text-ado-royal-purple underline mx-1">{t("privacy_notice")}</Link>.
                            </span>
                        }
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    className={`w-[267px] h-[43px] rounded-[4px] px-[52px] py-[12px] gap-[8px] flex items-center justify-center
                        ${isFormValid ? "!bg-ado-purple !text-white" : "!bg-ado-gray !text-ado-slate-gray"}
                    `}
                    disabled={!isFormValid}
                    buttonText={t("continue")}
                />
            </form>
        </Modal>
    );
};

export default RegisterFormModal;