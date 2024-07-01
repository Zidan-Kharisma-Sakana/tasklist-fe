import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Input = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    await login(data.email, data.password);
  };

  return (
    <div className="rounded-2xl bg-indigo-200 border-white text-black font-semibold border py-4 px-6 min-w-[500px]">
      <h2 className="text-xl border-b border-white pb-2">Login to your account</h2>
      <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block mb-2 text-sm font-medium mt-3">
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
        <label htmlFor="password" className="block mb-2 text-sm font-medium mt-3">
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
        <div className="my-3 flex justify-between flex-row items-center">
          <div className="">
            <div className="text-sm">
              Don&apos;t have account?{" "}
              <Link href={"/register"} className="text-blue-600 underline">
                Register here
              </Link>{" "}
            </div>
            <div className="text-sm">
              Forgot password?{" "}
              <Link href={"/forgot-password"} className="text-blue-600 underline">
                Click here
              </Link>{" "}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
