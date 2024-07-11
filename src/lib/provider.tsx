import { CartProvider } from "@/lib/cartContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastContainer />
      {children}
    </CartProvider>
  );
}
