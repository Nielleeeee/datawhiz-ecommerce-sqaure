"use client";

import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "./cartContext";

import "react-toastify/dist/ReactToastify.css";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckoutPage = pathname.startsWith("/checkout");

  return (
    <CartProvider>
      <ToastContainer />
      {!isCheckoutPage && <Header />}
      {children}
      {!isCheckoutPage && <Footer />}
    </CartProvider>
  );
}
