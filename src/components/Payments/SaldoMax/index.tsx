"use client";

import React, {useState} from "react";
import SaldoMaxCard from "@/components/Payments/SaldoMax/SaldoMaxCard";
import SaldoMaxForm from "@/components/Payments/SaldoMax/SaldoMaxForm";
import { useTranslations } from "next-intl";
import AdditionalPaymentModal from "./AdditionalPayementModal";
import SaldoMaxModal from "@/components/SaldoMaxModal";

const SaldoMaxPayment: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmitPin = (pin: string) => {
        console.log("PIN entered:", pin);
        setIsModalOpen(false);
      };
    const t = useTranslations("payment_info")
    const isGuestUser = false;
    return (
        <>
            {!isGuestUser && <SaldoMaxForm />}
            {isGuestUser && <SaldoMaxCard />}
            {/* <AdditionalPaymentModal isOpen={true} onClose={() => { }} /> */}
            <SaldoMaxModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                isAuthenticated={true}
                onSubmit={handleSubmitPin}
            />
        </>
    );
};

export default SaldoMaxPayment;
