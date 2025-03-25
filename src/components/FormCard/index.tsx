import React, { ReactNode } from "react";

interface FormCardProps {
    title?: string | ReactNode;  
    primaryTitle?: string | ReactNode; 
    children: ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ title, children, primaryTitle }) => {
    return (
        <div className="w-full max-w-[748px] mx-auto">
            {primaryTitle && (
                <div className="w-full text-center sm:text-left">
                    <h2 className="text-lg font-semibold mb-4">{primaryTitle}</h2>
                </div>
            )}

            <div className="w-full max-w-full sm:max-w-[748px] p-4 sm:p-6 rounded-lg border border-gray-300 bg-gray-100 shadow-md">
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
};


export default FormCard;
