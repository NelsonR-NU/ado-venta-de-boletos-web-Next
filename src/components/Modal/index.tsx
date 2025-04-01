import React, { ReactNode } from "react";
import close from "@/assets/svg/close.svg";
import Image from "next/image";
import Button from "@/components/Button";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
    showCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, showCloseIcon = true }) => {
    if (!isOpen) return null;

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10]"
            onClick={handleOutsideClick}
        >
            <div className="flex-col bg-white rounded-lg shadow-lg w-[600px] p-6 max-xs:w-fit max-xs:m-[20px]">
                <div className="flex justify-end">
                    {showCloseIcon && onClose && (
                        <Button
                            className="flex items-center gap-2 !text-ado-white cursor-pointer !bg-ado-background"
                            onClick={onClose}
                            iconPosition="right"
                            icon={<Image src={close} alt="close icon" className="w-4" />}
                        />
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;