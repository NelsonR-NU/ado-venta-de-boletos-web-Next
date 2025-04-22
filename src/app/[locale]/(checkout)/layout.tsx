"use client";
import { ReactNode } from "react";

// TODO: Add Header and Footer
// import Header from "@/components/header";
// import Footer from "@/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/* <CheckoutHeader /> */}
      {children}
      {/* <CheckoutFooter /> */}
    </>
  );
}
