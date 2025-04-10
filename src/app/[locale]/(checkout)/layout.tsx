"use client";
import { ReactNode } from "react";

// TODO: Add Header and Footer
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// TODO: Add Metadata for SEO
// export const metadata: Metadata = {
//   title: "Checkout ADO",
//   description: "Checkout ADO",
// };

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
