import React from "react";

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    label?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
    name,
    value,
    checked,
    onChange,
    label,
}) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="sr-only"
            />
            <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-ado-green bg-ado-green" : "border-ado-footer-gray"
                    }`}
            >
                {checked && <span className="w-2 h-2 rounded-full bg-ado-snow-gray" />}
            </span>
            {label && <span className="text-sm">{label}</span>}
        </label>
    );
};

export default RadioButton;
