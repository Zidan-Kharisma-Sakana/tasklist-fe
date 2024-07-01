import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Input = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const RegisterForm = () => {
    const { signUp } = useAuth();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Input>();
  
    const onSubmit: SubmitHandler<Input> = async ({email, name, password, password_confirmation}) => {
        await signUp(name, email, password, password_confirmation);
    };
  return (
    <div className="rounded-2xl bg-indigo-200 border-white text-black font-semibold border py-4 px-6 min-w-[500px]">
      <h2 className="text-xl border-b border-white pb-2">Register new account</h2>
      <form className="pt-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="my-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            required
            {...register("name")}
          />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John@gmail.com"
            required
            {...register("email")}
          />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
            {...register("password")}
          />
        </div>
        <div className="my-3">
          <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
            {...register("password_confirmation")}
          />
        </div>
        <div className="my-3 flex justify-between flex-row items-center">
          <div className="text-center">
            <span className="text-sm">
              Already have account?{" "}
              <Link href={"/login"} className="text-blue-600 underline">
                Log in here
              </Link>{" "}
            </span>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
