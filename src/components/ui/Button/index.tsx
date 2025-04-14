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
    "flex items-center justify-center rounded-md text-[16px] font-medium px-6 py-2 transition-all duration-300 ease-in-out select-none active:scale-95 ";

  const variantStyles = {
    primary: "bg-ado-purple text-white hover:bg-ado-purple/80 hover:shadow-md",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm",
  };

  const buttonStyleClasses = {
    filled: "border border-transparent",
    outline: "border border-ado-purple !text-ado-purple bg-transparent hover:bg-ado-purple/5",
    none: "border-none bg-transparent hover:text-ado-royal-purple",
  };

  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${disabled ? disabledStyles : variantStyles[variant]} ${buttonStyleClasses[buttonStyle]} ${className} ${className.includes("w-") ? "" : "w-auto"}`}>
      <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out group-hover:scale-105">
        {icon && iconPosition === "left" && icon}
        {buttonText}
        {icon && iconPosition === "right" && icon}
      </div>
    </button>
  );
};

export default Button;
