import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import close from '@/assets/svg/close.svg';
import Button from "@/components/Button";

interface DrawerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
    closeLabel?: string;
    children: React.ReactNode;
}

const DrawerModal: React.FC<DrawerModalProps> = ({
    isOpen,
    onClose,
    title = "Drawer",
    className = "",
    closeLabel = "Close",
    children,
}) => {
    return (
        <div className={className}>
            <Drawer anchor="right" open={isOpen} onClose={onClose}>
                <div className="w-[560px] max-sm:w-full h-full flex flex-col bg-white">

                    <div className="flex justify-between items-center bg-ado-purple border-b p-6">
                        <h2 className="text-lg text-ado-white">{title}</h2>
                        <Button
                            variant="primary"
                            buttonStyle="none"
                            className="flex items-center gap-2 !text-ado-white cursor-pointer"
                            onClick={onClose}
                            iconPosition="right"
                            buttonText={closeLabel}
                            icon={<Image src={close} alt="close icon" className="w-4 !invert" />}
                        />
                    </div>

                    <div className="flex-1 overflow-auto">{children}</div>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerModal;
