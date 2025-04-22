import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import alertIcon from "@/assets/png/alert.png";
import Image from "next/image";

interface AdditionalPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
}

const AdditionalPaymentModal: React.FC<AdditionalPaymentModalProps> = ({
    isOpen,
    onClose,
    onContinue,
}) => {
    const t = useTranslations("payment_info");

    return (
        <Modal isOpen={isOpen} showCloseIcon onClose={onClose}>
            <div className=" flex flex-col gap-4 text-center px-4 py-2">
                <div className="flex flex-col justify-center items-center gap-4">
                    <span className="text-yellow-500 w-fit text-2xl border border-ado-alert-border bg-ado-sandal rounded-[50%]">
                        <Image alt="date change" src={alertIcon} className="p-4" />
                    </span>
                    <h2 className="font-bold leading-tight text-center text-lg">   {t("additional_payement_title")}</h2>
                </div>
                <p className="text-center text-sm text-ado-black ">
                    <span className=" font-semibold">{t("additional_payement_label")}</span>
                    {t("additional_payement_content")}
                </p>
                <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
                    <Button
                        buttonStyle="outline"
                        className="w-full text-base"
                        buttonText={t("additional_payement_cancel")}
                        onClick={onClose}
                    />
                    <Button
                        className="w-full text-base"
                        buttonText={t("additional_payement_continue")}
                        onClick={onContinue}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AdditionalPaymentModal;
