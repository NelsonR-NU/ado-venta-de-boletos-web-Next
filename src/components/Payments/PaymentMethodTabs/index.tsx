'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Card from '@/components/Card';
import saldoMaxLogo from '@/assets/png/saldomax.png';
import creditCardLogo from '@/assets/png/creditCard.png';
import paypalLogo from '@/assets/png/paypal.png';
import mercadoPagoLogo from '@/assets/png/mercado.png';
import RadioButton from '@/components/ui/RadioButton';
import { useAppDispatch } from '@/business-logic/store/hooks';
import { setSelectedPaymentMethod } from '@/business-logic/store/payment';
import { useAppSelector } from "@/business-logic/store/hooks";

interface PaymentMethodTabProps {
    label: string;
    subLabel?: string;
    image: StaticImageData;
    checked: boolean;
    value: string;
    name: string;
    onChange: () => void;
}

const PaymentMethodTab: React.FC<PaymentMethodTabProps> = ({
    label,
    subLabel,
    image,
    checked,
    value,
    name,
    onChange,
}) => {
    return (
        <div className="flex flex-row justify-between items-center gap-4 px-4 py-4 lg:py-0">
            <div className="w-8 h-8 sm:flex items-center hidden">
                <Image src={image} alt={label} width={32} height={32} />
            </div>
            <div className="flex flex-col w-full text-ado-text-gray gap-2">
                <p className="text-base leading-tight">{label}</p>
                {subLabel && <p className="text-sm leading-tight">{subLabel}</p>}
            </div>
            <RadioButton
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};

const PaymentMethodTabs: React.FC = () => {
    const { selectedPaymentMethod } = useAppSelector((state) => state.payment);
    const dispatch = useAppDispatch()

    const paymentOptions = [
        {
            id: 'saldomax',
            label: 'SALDO MAX',
            subLabel: '',
            image: saldoMaxLogo,
        },
        {
            id: 'creditcard',
            label: 'Tarjeta de crédito o débito',
            subLabel: 'VISA / MasterCard / AMEX / Carnet',
            image: creditCardLogo,
        },
        {
            id: 'paypal',
            label: 'PayPal',
            subLabel: '',
            image: paypalLogo,
        },
        {
            id: 'mercadopago',
            label: 'Mercado Pago',
            subLabel: '',
            image: mercadoPagoLogo,
        },
    ];

    const onSelectPaymentTab = (paymentType) => {
        dispatch(setSelectedPaymentMethod(paymentType))

    }

    return (
        <div className="w-full lg:w-[361px] flex flex-col gap-4">
            {paymentOptions.map((item) => (
                <Card
                    key={item.id}
                    className={`w-full !p-0 bg-transparent max-md:rounded-[10px] shadow-none min-h-[76px] justify-center ${selectedPaymentMethod === item.id
                        ? 'lg:bg-ado-ice-blue lg:shadow-charcoal'
                        : ' sm:bg-ado-gray'
                        }`}
                >
                    <PaymentMethodTab
                        label={item.label}
                        subLabel={item.subLabel}
                        image={item.image}
                        value={item.id}
                        name="payment"
                        checked={selectedPaymentMethod === item.id ?? paymentOptions[0]?.id}
                        onChange={() => onSelectPaymentTab(item.id)}
                    />
                </Card>
            ))}
        </div>
    );
};

export default PaymentMethodTabs;
