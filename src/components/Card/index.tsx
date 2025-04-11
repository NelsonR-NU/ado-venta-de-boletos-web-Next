import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <section
    className={`w-full p-6 bg-ado-background-secondary rounded-2xl border border-ado-neutral-light border-solid shadow-charcoal flex flex-col gap-6 ${className}`}>
    {children}
  </section>
);

export default Card;
