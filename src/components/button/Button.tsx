import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "filled" | "outlined";
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "filled", onClick }) => {
    return (
        <button
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300
                ${variant === "filled"
                    ? "bg-ado-purple text-white hover:bg-ado-purple-900"
                    : "border border-ado-purple  text-ado-purple  text-sm font-semibold bg-ado-white hover:bg-purple-100"
                }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
