"use client";

import { createContext, useContext, useState, useEffect } from "react";
import commerce from "@/lib/commerce";
import { Cart } from "@chec/commerce.js/types/cart";
import {
  AddUpdateResponse,
  RemoveResponse,
  EmptyResponse,
} from "@chec/commerce.js/features/cart";
interface CartContextType {
  cart: Cart | null;
  addToCart: (
    productId: string,
    quantity: number
  ) => Promise<AddUpdateResponse>;
  updateCart: (lineID: string, quantity: number) => Promise<AddUpdateResponse>;
  removeToCart: (lineID: string) => Promise<RemoveResponse>;
  emptyCart: () => Promise<EmptyResponse>;
}

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
      const response = await commerce.cart.add(productID, quantity);

      if (!response.success) {
        console.log("invalid add to cart");
        throw new Error("Failed to add item to cart");
      }

      setCart(response.cart);
      return response;
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      throw error;
    }
  };

  const updateCart = async (lineID: string, quantity: number) => {
    try {
      const response = await commerce.cart.update(lineID, { quantity });

      if (!response.success) {
        console.log("invalid add to cart");
        throw new Error("Failed to add item to cart");
      }

      setCart(response.cart);
      return response;
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      throw error;
    }
  };

  const removeToCart = async (lineID: string) => {
    try {
      const response = await commerce.cart.remove(lineID);

      if (!response.success) {
        console.log("invalid add to cart");
        throw new Error("Failed to add item to cart");
      }

      setCart(response.cart);
      return response;
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      throw error;
    }
  };

  const emptyCart = async () => {
    try {
      const response = await commerce.cart.empty();

      if (!response.success) {
        console.log("invalid add to cart");
        throw new Error("Failed to add item to cart");
      }

      setCart(response.cart);
      return response;
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, removeToCart, emptyCart }}
    >
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
