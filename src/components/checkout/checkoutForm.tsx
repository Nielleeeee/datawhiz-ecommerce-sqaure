// "use client";

// import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
// import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
// import { useFormik } from "formik";
// import { captureOrder } from "@/app/action/checkout/checkout";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { useRouter } from "next/navigation";

// export default function CheckoutForm(checkoutToken: CheckoutToken) {
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       firstName: "",
//       lastName: "",
//       phoneNumber: "",
//       cardNumber: "",
//       month: "",
//       year: "",
//       securityCode: "",
//       postalCode: "",
//     },

//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       firstName: Yup.string().required("Required"),
//       lastName: Yup.string().required("Required"),
//       phoneNumber: Yup.string().required("Required"),
//       cardNumber: Yup.string()
//         .matches(
//           /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/,
//           "Invalid credit card number"
//         )
//         .required("Required"),
//       month: Yup.string()
//         .matches(/^(0[1-9]|1[0-2])$/, "Month must be between 01 and 12")
//         .required("Required"),
//       year: Yup.string()
//         .matches(/^[0-9]{4}$/, "Year must be 4 digits")
//         .test(
//           "expiration",
//           "Card has expired",
//           function (value: string | undefined) {
//             if (!value) return false;
//             const currentYear = new Date().getFullYear();
//             return parseInt(value, 10) >= currentYear;
//           }
//         )
//         .required("Required"),
//       securityCode: Yup.string()
//         .matches(/^[0-9]{3,4}$/, "Security code must be 3 or 4 digits")
//         .required("Required"),
//       postalCode: Yup.string()
//         .matches(/^[0-9]{5}(-[0-9]{4})?$/, "Invalid postal code")
//         .required("Required"),
//     }),

//     onSubmit: async (values) => {
//       const orderData: CheckoutCapture = {
//         line_items: checkoutToken.line_items.reduce(
//           (acc: { [key: string]: { quantity: number } }, item) => {
//             acc[item.id] = { quantity: item.quantity };
//             return acc;
//           },
//           {}
//         ),
//         customer: {
//           email: values.email,
//           firstname: values.firstName,
//           lastname: values.lastName,
//           phone: values.phoneNumber,
//         },
//         billing: {
//           name: values.firstName + " " + values.lastName,
//           postal_zip_code: values.postalCode,
//         },
//         payment: {
//           gateway: "test_gateway", // Change this to your actual gateway in production
//           card: {
//             number: values.cardNumber,
//             expiry_month: values.month,
//             expiry_year: values.year,
//             cvc: values.securityCode,
//             postal_zip_code: values.postalCode,
//           },
//         },
//       };

//       const orderResponse = captureOrder(checkoutToken.id, orderData);

//       await toast
//         .promise(orderResponse, {
//           pending: "Placing order... 🙄",
//           success: "Order Completed. Check Receipt On Email 👌",
//           error: "Something went wrong. 😱",
//         })
//         .then(() => {
//           setTimeout(() => {
//             router.push("/");
//           }, 3000);
//         });
//     },
//   });

//   return (
//     <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
//       <div className="mx-auto w-full max-w-lg">
//         <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
//           Secure Checkout
//           <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
//         </h1>

//         <form
//           onSubmit={formik.handleSubmit}
//           className="mt-10 grid grid-cols-8 gap-4"
//         >
//           <div className="col-span-4">
//             <label
//               htmlFor="firstName"
//               className="text-xs font-semibold text-gray-500"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               onChange={formik.handleChange}
//               value={formik.values.firstName}
//               placeholder="John"
//               className={`mt-1 block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.firstName && formik.errors.firstName
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4">
//             <label
//               htmlFor="lastName"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               onChange={formik.handleChange}
//               value={formik.values.lastName}
//               placeholder="Doe"
//               className={`mt-1 block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2 ${
//                 formik.touched.lastName && formik.errors.lastName
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4">
//             <label
//               htmlFor="phoneNumber"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phoneNumber"
//               name="phoneNumber"
//               onChange={formik.handleChange}
//               value={formik.values.phoneNumber}
//               placeholder="+1234567890"
//               className={`remove-arrow mt-1 block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.firstName && formik.errors.firstName
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4">
//             <label
//               htmlFor="email"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={formik.handleChange}
//               value={formik.values.email}
//               placeholder="john.doe@example.com"
//               className={`mt-1 block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.email && formik.errors.firstName
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4">
//             <label
//               htmlFor="card-number"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Card number
//             </label>

//             <input
//               type="text"
//               id="cardNumber"
//               name="cardNumber"
//               onChange={formik.handleChange}
//               value={formik.values.cardNumber}
//               placeholder="1234-5678-XXXX-XXXX"
//               className={`block w-full rounded bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.cardNumber && formik.errors.cardNumber
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4">
//             <p className="text-xs font-semibold text-gray-500">
//               Expiration date
//             </p>

//             <div className="grid grid-cols-7 gap-2">
//               <div className="my-1 col-span-3">
//                 <label htmlFor="month" className="sr-only">
//                   Select expiration month
//                 </label>

//                 <input
//                   type="text"
//                   id="month"
//                   name="month"
//                   onChange={formik.handleChange}
//                   value={formik.values.month}
//                   placeholder="Month"
//                   maxLength={2}
//                   className={`rounded remove-arrow w-full bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                     formik.touched.month && formik.errors.month
//                       ? "border-red-500"
//                       : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//                   }
//                   `}
//                 />
//               </div>

//               <span className="col-span-1 flex items-center justify-center">
//                 /
//               </span>

//               <div className="my-1 col-span-3">
//                 <label htmlFor="year" className="sr-only">
//                   Select expiration year
//                 </label>
//                 <input
//                   type="text"
//                   id="year"
//                   name="year"
//                   onChange={formik.handleChange}
//                   value={formik.values.year}
//                   placeholder="Year"
//                   maxLength={4}
//                   className={`rounded remove-arrow w-full bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                     formik.touched.year && formik.errors.year
//                       ? "border-red-500"
//                       : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-span-4 relative my-1">
//             <label
//               htmlFor="securityCode"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Security code
//             </label>

//             <input
//               type="text"
//               id="securityCode"
//               name="securityCode"
//               onChange={formik.handleChange}
//               value={formik.values.securityCode}
//               placeholder="Security code"
//               className={`remove-arrow block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.securityCode && formik.errors.securityCode
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <div className="col-span-4 relative my-1">
//             <label
//               htmlFor="postalCode"
//               className="text-xs font-semibold text-gray-500"
//             >
//               Postal Zip Code
//             </label>
//             <input
//               type="text"
//               id="postalCode"
//               name="postalCode"
//               onChange={formik.handleChange}
//               value={formik.values.postalCode}
//               placeholder="Postal Zip Code"
//               className={`block w-full rounded bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition border-2  ${
//                 formik.touched.postalCode && formik.errors.postalCode
//                   ? "border-red-500"
//                   : "border-gray-200 focus:ring-2 focus:ring-teal-500"
//               }`}
//             />
//           </div>

//           <p className="col-span-8 mt-10 text-center text-sm font-semibold text-gray-500">
//             By placing this order you agree to the{" "}
//             <a
//               href="#"
//               className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
//             >
//               Terms and Conditions
//             </a>
//           </p>

//           <button
//             type="submit"
//             disabled={formik.isSubmitting || !formik.isValid}
//             className="col-span-8 mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100  sm:text-lg disabled:bg-gray-400 disabled:text-gray-500"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
