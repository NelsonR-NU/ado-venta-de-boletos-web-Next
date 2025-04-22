"use client";

import React from "react";
import SaldoMaxCard from "@/components/Payments/SaldoMax/SaldoMaxCard";
import SaldoMaxForm from "@/components/Payments/SaldoMax/SaldoMaxForm";
import { useTranslations } from "next-intl";
import AdditionalPaymentModal from "./AdditionalPayementModal";

const SaldoMaxPayment: React.FC = () => {
    const t = useTranslations("payment_info")
    const isGuestUser = false;
    return (
        <>
            {!isGuestUser && <SaldoMaxForm />}
            {isGuestUser && <SaldoMaxCard />}
            {/* <AdditionalPaymentModal isOpen={true} onClose={() => { }} /> */}
        </>
    );
};

export default SaldoMaxPayment;
