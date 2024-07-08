import { CartProvider } from "@/lib/cartContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
