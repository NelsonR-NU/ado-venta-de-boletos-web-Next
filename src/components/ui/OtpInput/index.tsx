
import React, { useEffect, useRef } from "react";
import InputField from "@/components/ui/Input"; 
import { useTranslations } from "next-intl";
import Link from "next/link";
type OtpInputProps = {
    length: number;
    value: string[];
    onChange: (val: string[]) => void;
    onComplete?: (val: string) => void;
    inputClassName?: string;
    containerClassName?: string;
    label?: string;
    forgotPinText?: string;
    forgotPinLink?: string;
};

const OtpInput: React.FC<OtpInputProps> = ({
    length,
    value,
    onChange,
    onComplete,
    containerClassName = "",
    label ,
    forgotPinText,
    forgotPinLink = "#",
}) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const t = useTranslations("payment_info");

    const handleChange = (index: number, val: string) => {
        const newValue = [...value];
        newValue[index] = val.slice(-1);
        onChange(newValue);

        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newValue.every((digit) => digit !== "") && onComplete) {
            onComplete(newValue.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            const newValue = [...value];
            newValue[index - 1] = "";
            onChange(newValue);
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    return (
        <div className={`flex flex-col gap-[16px] pt-8 pb-4 ${containerClassName}`}>
            <p className="text-center font-medium mb-2">{label ?? t("enterPin")}</p>
            <div className="flex justify-center gap-6 mb-4">
                {Array.from({ length }).map((_, index) => (
                    <InputField
                        key={index}
                        type="number"
                        name={`otp-${index}`}
                        value={value[index] || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        required
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-[45px] h-[45px] text-center rounded-full appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [-moz-appearance:textfield]"
                        placeholder=""
                    />
                ))}
            </div>
            <p className="text-sm text-center underline decoration-ado-selected">
                {t("forgotPin")}
                <Link href={forgotPinLink} className="text-ado-selected font-medium pl-2">{t("clickHere")}</Link>
            </p>
        </div>
    );
};

export default OtpInput;
