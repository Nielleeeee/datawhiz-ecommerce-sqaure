import { Cart } from "@chec/commerce.js/types/cart";
import commerce from "@/lib/commerce";

export const generateCartCheckoutToken = async (cart: Cart) => {
  try {
    const token = commerce.checkout.generateToken(cart.id, { type: "cart" });

    return token;
  } catch (error) {
    console.error("Error Checking Out: ", error);
    throw error;
  }
};

export const validateCheckoutToken = async (token: string) => {
  try {
    const isTokenValid = await commerce.checkout.getToken(token);

    return { valid: true, isTokenValid };
  } catch (error) {
    console.error("Error validating token: ", error);
    throw error;
  }
};
