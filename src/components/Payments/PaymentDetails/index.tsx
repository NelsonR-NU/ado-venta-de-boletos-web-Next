"use client";

import Card from "@/components/Card";
import React, {useState} from "react";
import { useAppSelector } from "@/business-logic/store/hooks";
import SaldoMaxPayment from "@/components/Payments/SaldoMax";
import CreditCardPayment from "@/components/Payments/CreditCard";


const PaymentDetails: React.FC = () => {
    const { selectedPaymentMethod } = useAppSelector((state) => state.payment);

    return (
        <>
            <Card
                className={`flex-1 !gap-2 lg:min-w-[375px] h-fit border border-ado-gray  shadow-none bg-ado-white rounded-[10px] p-6 text-ado-text-gray`}>
                {selectedPaymentMethod === "saldomax" && <SaldoMaxPayment />}
                {selectedPaymentMethod === "creditcard" && <CreditCardPayment />}

            </Card>
        </>
    );
};

export default PaymentDetails;
