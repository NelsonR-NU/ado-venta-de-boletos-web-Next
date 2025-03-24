import * as React from "react";
import Drawer from "@mui/material/Drawer";
import close from '@/assets/svg/close.svg' 
import Image from "next/image";
import Button from "@/components/Button"

interface DrawerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    closeLabel: string;
    children: React.ReactNode;
}

const DrawerModal: React.FC<DrawerModalProps> = ({ isOpen, onClose, title, closeLabel, children }) => {
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <div className="w-[500px] h-full flex flex-col bg-white  xs:w-fit">
                <div className="flex justify-between items-center bg-ado-purple border-b p-6">
                    <h2 className="text-lg text-ado-white">{title}</h2>
                    <Button className="flex items-center gap-2 !text-ado-white cursor-pointer " onClick={onClose} iconPosition="right" buttonText={closeLabel} icon={<Image src={close} alt="close icon" className="w-4 !invert" />} />
                </div>
                {children}
            </div>
        </Drawer>
    );
};

export default DrawerModal;
