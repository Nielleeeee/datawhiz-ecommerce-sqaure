"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";
import { AddUpdateResponse } from "@chec/commerce.js/features/cart";

interface CartContextType {
  cart: Cart | null;
  addToCart: (
    productId: string,
    quantity: number
  ) => Promise<AddUpdateResponse>;
}

const commerce = new Commerce(`${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`);

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    };

    fetchCart();
  }, []);

  const addToCart = async (productID: string, quantity: number) => {
    const response = await commerce.cart.add(productID, quantity);
    setCart(response.cart);
    return response;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("Out of bounds");
  }
  return context;
};
