"use client";
import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DialogIcon from "@/assets/svg/Union.svg";
import LanguageIcon from "@/assets/svg/language.svg";
import CurrencyIcon from "@/assets/svg/currency.svg";
import Dropdown from "@/components/dropdown/Dropdown";
import FontSizeSlider from "../fontSizeSlider/FontSizeSlider";

interface AccessibilityBarProps {
    supportText?: {
        desktop: string;
        mobile: string;
    };
}

const AccessibilityBar: React.FC<AccessibilityBarProps> = React.memo(() => {
    const t = useTranslations('accessibility_bar');

    const currencyOptions = Object.keys(t.raw("currency")).map((key) => ({
        value: t(`currency.${key}.value`),
        label: t(`currency.${key}.label`),
        icon: CurrencyIcon,
    }));

    const languageOptions = Object.keys(t.raw("language")).map((key) => ({
        value: t(`language.${key}.value`),
        label: t(`language.${key}.label`),
        icon: LanguageIcon,
    }));

    const [currency, setCurrency] = useState(currencyOptions[0]?.value);
    const [language, setLanguage] = useState(languageOptions[0]?.value);

    const handleCurrencyChange = useCallback((value: string) => {
        setCurrency(value);
    }, []);

    const handleLanguageChange = useCallback((value: string) => {
        setLanguage(value);
    }, []);

    const accessibilityItems = [
        {
            label: { desktop: currency, mobile: currencyOptions[0]?.value },
            iconSize: { width: 18, height: 18 },
            hasDropdown: true,
            dropdownOptions: currencyOptions,
            onSelect: handleCurrencyChange,
        },
        {
            label: { desktop: language, mobile: languageOptions[0]?.value },
            iconSize: { width: 18, height: 18 },
            hasDropdown: true,
            dropdownOptions: languageOptions,
            onSelect: handleLanguageChange,
        },
    ];

    return (
        <div className="flex bg-ado-grey h-8 px-4 w-full max-w-[1440px] h-[32px]">
            <div className={`flex w-full h-[32px] justify-between 
                px-4 lg:px-[54px]
                max-w-[1440px] mx-auto text-xs md:text-sm items-center flex-wrap`}>
                <div className="flex gap-2 items-center text-ado-white" role="welcome-text" tabIndex={0}>
                    <Image alt="Support Icon" src={DialogIcon} height={16} width={16} />
                    <span className="hidden md:inline text-ado-white">{t('supportText.desktop')}</span>
                    <span className="md:hidden text-ado-white">{t('supportText.mobile')}</span>
                </div>
                <div className="flex gap-3 md:gap-6 items-center">
                    <div>
                        <FontSizeSlider />
                    </div>
                    {accessibilityItems.map(({ icon, label, iconSize, hasDropdown, dropdownOptions, onSelect }) => (
                        <div key={label.desktop} className="flex gap-1 items-center">
                            {hasDropdown ? (
                                <Dropdown
                                    options={dropdownOptions}
                                    selected={label.desktop}
                                    onChange={onSelect}
                                    aria-label={`Select ${label.desktop}`}
                                    role="combobox"
                                    aria-expanded="true"
                                />

                            ) : (
                                <div className="gap-2" tabIndex={0}>
                                    {icon && <Image src={icon} alt={`${label.desktop} icon`} width={iconSize.width} height={iconSize.height} />
                                    }
                                    <span className="text-ado-white hidden md:inline">{label.desktop}</span>
                                    <span className="text-ado-white md:hidden" aria-label={label?.desktop}>{label.mobile}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default AccessibilityBar;
