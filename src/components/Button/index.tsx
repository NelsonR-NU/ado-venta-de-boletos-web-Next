import React, { ReactNode } from "react";

interface ButtonProps {
  width?: string | number;
  type?: "button" | "submit" | "reset";
  variant?: string;
  buttonText?: string | ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  width = "auto",
  type = "button",
  variant = "secondary",
  buttonText = "",
  className = "",
  disabled = false,
  onClick,
  icon = null,
  iconPosition = "left",
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      style={{
        backgroundColor: variant === "primary" ? "#5F2167" : "transparent",
        color: variant === "primary" ? "white" : "#5F2167",
        width: typeof width === "number" ? `${width}px` : width,
      }}
      className={`flex !items-center border border-ado-purple gap-2 rounded-[4px] text-[16px] font-medium px-6 py-2 cursor-pointer transition duration-200 ease-in-out ${className}`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && icon}
      {buttonText}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
