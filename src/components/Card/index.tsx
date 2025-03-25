import React, { ReactNode } from "react";

interface CardProps {
    title?: string | ReactNode;
    primaryTitle?: string | ReactNode;
    children: ReactNode;
    className?: string;
    width?: string;
    cardClassName?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    children,
    primaryTitle,
    className = "",
    width = "full",
    cardClassName = "w-full max-w-full sm:max-w-[748px] p-4 sm:p-6 rounded-lg border border-gray-300 bg-gray-100 shadow-md"
}) => {
    return (
        <div className={`${className} w-${width}`}>
            {primaryTitle && (
                <div className="w-full text-center sm:text-left">
                    <h2 className="text-lg font-semibold mb-4">{primaryTitle}</h2>
                </div>
            )}

            <div className={`${cardClassName} w-${width}`}>
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Card;