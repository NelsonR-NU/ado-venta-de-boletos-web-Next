import React from "react";

interface InputFieldProps {
  label?: string | React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  className = "",
}) => (
  <div className="flex-1">
    {label && <label className="block text-sm font-medium text-ado-charcoal">{label}</label>}
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className={`mt-1 w-full p-2 border rounded-lg bg-white placeholder-ado-steel-gray focus:outline-none ${className}`}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
