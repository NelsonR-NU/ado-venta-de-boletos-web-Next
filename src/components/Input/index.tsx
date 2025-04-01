import React from "react";

interface InputFieldProps {
    label: string | React.ReactNode;
    type: string;
    name: string;
    value: string | boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder, required }) => {
    return (
        <div className="flex-1">
            <label className="block text-sm font-medium text-ado-charcoal">{label}</label>
            <input
                type={type}
                name={name}
                value={typeof value === "boolean" ? String(value) : value}
                onChange={onChange}
                required={required}
                className="mt-1 w-full p-2 border rounded-lg bg-white placeholder-ado-steel-gray"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
