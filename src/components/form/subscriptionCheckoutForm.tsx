"use client";

import { useForm, SubmitHandler, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { SubscriptionCheckoutFormProps } from "../../../type";
import { State, City } from "country-state-city";
import Selector from "@/components/ui/selector";
import { useEffect, useState } from "react";
import { ICity } from "country-state-city";
import Link from "next/link";

export default function SubscriptionCheckoutForm({
  subscriptionID,
}: {
  subscriptionID: string;
}) {
  const allStateData = State.getStatesOfCountry("US");

  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedState, setSelectedState] = useState<string>(
    allStateData[0].isoCode
  );

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
    state: Yup.string().required("State is required"),
    city: Yup.string(),
    zipCode: Yup.string().required("Zip Code is required"),
    consent: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (selectedState) {
      const citiesOfState = City.getCitiesOfState("US", selectedState);
      setCities(citiesOfState);

      if (citiesOfState.length > 0) {
        setValue("city", citiesOfState[0].name);
      } else {
        setValue("city", "");
      }
    }
  }, [selectedState, setValue]);

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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? "border-red-400 border-2" : "border-gray-400"
              }`}
            />

            {errors.firstName && (
              <span className="text-red-500 text-xs tracking-tight">
                {errors.firstName.message}
              </span>
            )}
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? "border-red-400 border-2" : "border-gray-400"
              }`}
            />

            {errors.lastName && (
              <span className="text-red-500 text-xs tracking-tight">
                {errors.lastName.message}
              </span>
            )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-400 border-2" : "border-gray-400"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.email.message}
            </span>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phoneNumber ? "border-red-400 border-2" : "border-gray-400"
            }`}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.phoneNumber.message}
            </span>
          )}
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
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.gender.message}
            </span>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.birthday ? "border-red-400 border-2" : "border-gray-400"
            }`}
          />
          {errors.birthday && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.birthday.message}
            </span>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.addressLine1
                ? "border-red-400 border-2"
                : "border-gray-400"
            }`}
          />
          {errors.addressLine1 && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.addressLine1.message}
            </span>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.addressLine2
                ? "border-red-400 border-2"
                : "border-gray-400"
            }`}
          />
          {errors.addressLine2 && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.addressLine2.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State*
            </label>

            <Selector
              setSelectedCode={setSelectedState}
              setValue={setValue}
              data={allStateData}
              name="state"
            />
            {errors.state && (
              <span className="text-red-500 text-xs tracking-tight">
                {errors.state.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City*
            </label>
            <Selector setValue={setValue} data={cities} name="city" />
            {errors.city && (
              <span className="text-red-500 text-xs tracking-tight">
                {errors.city.message}
              </span>
            )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.zipCode ? "border-red-400 border-2" : "border-gray-400"
            }`}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-xs tracking-tight">
              {errors.zipCode.message}
            </span>
          )}
        </div>
        <div className="flex gap-4 justify-center items-center">
          <input
            type="checkbox"
            {...register("consent")}
            id="consent"
            className="h-6 w-6"
          />

          <label htmlFor="consent" className="sr-only">
            consent
          </label>

          <span className="text-black text-sm w-full">
            I agree to{" "}
            <Link href={"#"} target="_blank" className="text-blue-500">
              terms & condition
            </Link>
          </span>

          {errors.consent && (
            <span className="text-red-500 text-sm col-span-4">
              {errors.consent.message}
            </span>
          )}
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
