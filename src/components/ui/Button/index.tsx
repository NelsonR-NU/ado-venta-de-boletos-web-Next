import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  buttonStyle?: "outline" | "filled" | "none";
  buttonText?: string | ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  buttonStyle = "filled",
  buttonText = "",
  className = "",
  disabled = false,
  onClick,
  icon = null,
  iconPosition = "left",
}) => {
  const baseStyles =
    "flex items-center justify-center rounded-[4px] text-[16px] font-medium px-6 py-2 ";

  const variantStyles = {
    primary: "bg-ado-purple text-white hover:shadow-md",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm",
  };

  const buttonStyleClasses = {
    filled: "border border-transparent hover:bg-ado-purple/80",
    outline: "border border-ado-purple !text-ado-purple bg-transparent hover:bg-ado-purple/5",
    none: "border-none bg-transparent hover:text-ado-royal-purple",
  };

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${buttonStyleClasses[buttonStyle]} ${className} ${className.includes("w-") ? "" : "w-auto"} ${disabled ? disabledStyles : variantStyles[variant]} `}>
      <div className="flex items-center gap-2">
        {icon && iconPosition === "left" && icon}
        {buttonText}
        {icon && iconPosition === "right" && icon}
      </div>
    </button>
  );
};

export default Button;
