"use client";

import React from "react";
import { useTranslations } from "next-intl";

const CreditCardPayment = () => {
    const t = useTranslations("payment_info")
    return (
        <>
            <h2>Credit Card Payment</h2>
        </>
    );
};

export default CreditCardPayment;
