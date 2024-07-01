import { AxiosClient } from "@/lib/client/axios";
import { useAuth } from "@/lib/hooks/useAuth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Input = {
  password: string;
  password_confirmation: string;
};

export const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const id = toast.loading("loading...");
    AxiosClient.post("/api/reset-password", {
      ...data,
      token: router.query.token,
      email: router.query.email,
    })
      .then((response) => {
        console.info(response.data);
        toast.success("Successfully reset your password");
      })
      .catch((error: AxiosError) => {
        console.error(error);
        const errors = (error.response?.data as any)?.errors?.password;
        if (Array.isArray(errors) && errors.length > 0) {
          errors.forEach((error) => toast.error(error));
        } else {
          toast.error("Oops! Something went wrong");
        }
      })
      .finally(() => {
        toast.dismiss(id);
      });
  };

  return (
    <div className="rounded-2xl bg-indigo-200 border-white text-black font-semibold border py-4 px-6 min-w-[500px]">
      <h2 className="text-xl border-b border-white pb-2">Reset Your Password</h2>
      <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password" className="block mb-2 text-sm font-medium mt-3">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="*******"
          required
          {...register("password")}
        />
        <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium mt-3">
          Confirm Password
        </label>
        <input
          type="password"
          id="password_confirmation"
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="*******"
          required
          {...register("password_confirmation")}
        />
        <div className="my-3 flex justify-between flex-row items-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
