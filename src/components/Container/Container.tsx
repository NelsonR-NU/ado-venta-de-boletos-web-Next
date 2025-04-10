import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = "", fullWidth = false }) => (
  <div
    className={`${
      fullWidth
        ? "w-full"
        : "max-w-[1150px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 lg:py-6"
    } ${className}`}>
    {children}
  </div>
);

export default Container;
