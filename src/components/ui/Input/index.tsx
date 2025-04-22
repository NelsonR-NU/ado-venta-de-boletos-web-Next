import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  name: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      required,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex-1">
        {label && (
          <label className="block text-sm font-medium text-ado-charcoal">
            {label}
          </label>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          ref={ref}
          placeholder={placeholder}
          className={`min-h-[45px] border rounded-[4px] px-[16px] py-[14px] 
  focus:outline-none ${className || ""}`}

          {...rest}
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
