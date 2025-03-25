import React, { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    width?: string;
    cardClassName?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    className = "",
    width = "w-full",
    cardClassName = "w-full max-w-full sm:max-w-[748px] p-4 sm:p-6 rounded-lg border border-gray-300 bg-gray-100 shadow-md"
}) => {
    return (
        <div className={`${width} ${className}`}>
            <div className={`${cardClassName}`}>
                {children}
            </div>
        </div>
    );
};

export default Card;
