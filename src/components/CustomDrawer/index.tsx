import React from "react";
import { X } from "lucide-react";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-80",
}) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}> 
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div> 
      <div
        className={`fixed ${position}-0 top-0 h-full ${width} bg-white shadow-lg p-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : position === "right" ? "translate-x-full" : "-translate-x-full"}`}
      > 
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X className="h-6 w-6" />
        </button> 
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
};

export default CustomDrawer;