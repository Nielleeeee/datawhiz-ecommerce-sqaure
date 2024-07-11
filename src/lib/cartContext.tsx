"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";

interface CartContextType {
  cart: Cart | null;
  addToCart: (productId: string, quantity: number) => Promise<Cart>;
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
    try {
      const response: any = await commerce.cart.add(productID, quantity);

      if (response.error) {
        console.log("invalid add to cart");
        throw new Error("Failed to add item to cart");
      }

      setCart(response);
      return response;
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      throw error;
    }
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
