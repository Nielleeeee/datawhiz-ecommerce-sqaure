// "use server";


// interface validateQuantityParams {
//   token: string;
//   lineItemId: string;
//   data: { amount: number; variant_id?: string };
// }

// export const generateCartCheckoutToken = async (
//   product: string,
//   checkoutType: "cart" | "product_id" | "permalink"
// ) => {
//   try {
//     const token = commerce.checkout.generateToken(product, {
//       type: checkoutType,
//     });

//     return token;
//   } catch (error) {
//     console.error("Error Checking Out: ", error);
//     throw error;
//   }
// };

// export const validateCheckoutToken = async (token: string) => {
//   try {
//     const checkout = await commerce.checkout.getToken(token);

//     return { valid: true, checkout };
//   } catch (error) {
//     return { valid: false, checkout: null };
//   }
// };

// export const validateQuantity = async ({
//   token,
//   lineItemId,
//   data,
// }: validateQuantityParams) => {
//   try {
//     const isQuantityValid = await commerce.checkout.checkQuantity(
//       token,
//       lineItemId,
//       data
//     );

//     return { valid: true, isQuantityValid };
//   } catch (error) {
//     return { valid: false, isQuantityValid: null };
//   }
// };

// export const captureOrder = async (
//   token: string,
//   checkoutCapture: CheckoutCapture
// ) => {
//   try {
//     const order = await commerce.checkout.capture(token, checkoutCapture);

//     return order;
//   } catch (error) {
//     console.error("Error capturing order: ", error);
//     throw error;
//   }
// };
