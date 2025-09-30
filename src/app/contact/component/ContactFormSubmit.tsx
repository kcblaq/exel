"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

// Define form data shape
type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
  botcheck?: boolean;
};

export default function ContactFormSubmit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormInputs>({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Please update the Access Key in the .env
  const apiKey: string = process.env.NEXT_PUBLIC_ACCESS_KEY ?? "YOUR_ACCESS_KEY_HERE";

  const { submit: onSubmit } = useWeb3Forms<ContactFormInputs>({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg: string) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg: string) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  const handleFormSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="my-10">
        <input
          type="checkbox"
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        />

        {/* Full Name */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none dark:bg-gray-900 focus:ring-4 ${
              errors.name
                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
            }`}
            {...register("name", {
              required: "Full name is required",
              maxLength: 80,
            })}
          />
          {errors.name && (
            <div className="mt-1 text-red-600">
              <small>{errors.name.message}</small>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email_address" className="sr-only">
            Email Address
          </label>
          <input
            id="email_address"
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none dark:bg-gray-900 focus:ring-4 ${
              errors.email
                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
            }`}
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-600">
              <small>{errors.email.message}</small>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="mb-3">
          <textarea
            placeholder="Your Message"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none h-36 focus:ring-4 dark:bg-gray-900 ${
              errors.message
                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
            }`}
            {...register("message", {
              required: "Enter your Message",
            })}
          />
          {errors.message && (
            <div className="mt-1 text-red-600">
              <small>{errors.message.message}</small>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black"
        >
          {isSubmitting ? (
            <svg
              className="w-5 h-5 mx-auto animate-spin text-white dark:text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 
                5.29A7.96 7.96 0 014 12H0c0 3.04 
                1.13 5.82 3 7.94l3-2.65z"
              />
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      {/* Success / Error Messages */}
      {isSubmitSuccessful && isSuccess && (
        <div className="mt-3 text-sm text-center text-green-500">
          {message || "Success. Message sent successfully"}
        </div>
      )}
      {isSubmitSuccessful && !isSuccess && (
        <div className="mt-3 text-sm text-center text-red-500">
          {message || "Something went wrong. Please try later."}
        </div>
      )}
    </>
  );
}
