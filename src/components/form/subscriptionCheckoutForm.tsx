"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { SubscriptionCheckoutFormProps } from "../../../type";

export default function SubscriptionCheckoutForm({
  subscriptionID,
}: {
  subscriptionID: string;
}) {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    birthday: Yup.string().required("Birthday is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    consent: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubscriptionCheckoutFormProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<SubscriptionCheckoutFormProps> = async (
    data
  ) => {
    try {
      console.log("Form Data: ", data);
      // const response = submitContactForm(data);

      // await toast
      //   .promise(response, {
      //     pending: "Sending contact form...",
      //     success: "Contact form sent successfully.",
      //     error: "Something went wrong.",
      //   })
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      reset();
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phoneNumber")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Gender*
          </span>
          <div className="space-y-2">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  {...register("gender")}
                  value={gender.toLowerCase()}
                  className="form-radio text-blue-600"
                  required
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth*
          </label>
          <input
            type="date"
            id="birthday"
            {...register("birthday")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Home Address</h2>
        <div>
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 1*
          </label>
          <input
            type="text"
            id="addressLine1"
            {...register("addressLine1")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 2
          </label>
          <input
            type="text"
            id="addressLine2"
            {...register("addressLine2")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City*
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State*
            </label>
            <select
              id="state"
              {...register("state")}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              {/* Add more states here */}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Zip Code*
          </label>
          <input
            type="text"
            id="zipCode"
            {...register("zipCode")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
