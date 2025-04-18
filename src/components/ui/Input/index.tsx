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
  width?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  width,
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
      className={`min-w-[300px] min-h-[45px] rounded-[4px] border pt-[14px] pr-[16px] pb-[14px] pl-[16px] gap-[8px] focus:outline-none ${width ? width : 'min-w-[327px]'} ${className}`}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
