import { Cart } from "@chec/commerce.js/types/cart";
import commerce from "@/lib/commerce";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckQuantityResponse } from "@chec/commerce.js/features/checkout";

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
    const checkout = await commerce.checkout.getToken(token);

    return { valid: true, checkout };
  } catch (error) {
    return { valid: false, checkout: null };
  }
};

export const captureOrder = async (
  token: string,
  checkoutCapture: CheckoutCapture
) => {
  try {
    const order = await commerce.checkout.capture(token, checkoutCapture);

    return order;
  } catch (error) {
    console.error("Error capturing order: ", error);
    throw error;
  }
};

export const validateQuantity = async (token: string, lineItemId: string, data: object) => {
  try {
    const isQuantityValid = await commerce.checkout.checkQuantity(token, lineItemId, data);

    return { valid: true, isQuantityValid };
  } catch (error) {
    return { valid: false, isQuantityValid: null };
  }
}