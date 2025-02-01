import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import Title from "../Title";
import { useForm } from "react-hook-form";
import useSignup from "@/hooks/useSignup";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate, isPending, error } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    mutate(data, {
      onSuccess: (res) => {
        console.log("Sign up success:", res);

        // Set token in cookies
        // if(res?)

        reset();
      },
      onError: (error) => {
        console.log("Signn up error", error?.message || error);
      },
    });
  };

  return (
    <div className=" relative flex-1 flex flex-col items-center justify-center  h-full p-5 ">
      <div className=" border-orange-300 absolute top-20 border-t-8 rounded-full w-full h-full "></div>

      <div className=" absolute top-5 left-5 ">
        <Title />
      </div>
      <h4 className=" text-center text-2xl font-bold mb-10 ">
        Create an account
      </h4>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" relative z-20 sm:w-full lg:w-[60%] flex flex-col gap-5 "
      >
        <label>
          <span className=" text-sm font-sans text-gray-400 ">Full name</span>
          <input
            className=" mt-2 w-full outline-none bg-white rounded-3xl px-4 py-2 "
            type="text"
            placeholder="Miah Miah"
            {...register("userName", { required: true })}
          />
        </label>
        <label>
          <span className=" text-sm font-sans text-gray-400 ">Email</span>
          <input
            className=" mt-2 w-full outline-none bg-white rounded-3xl px-4 py-2 "
            type="email"
            placeholder="milon.miah@qq.com"
            {...register("email", { required: true })}
          />
        </label>
        <div>
          <span className=" text-sm font-sans text-gray-400 ">Password</span>
          <div className="relative">
            <input
              className=" mt-2 w-full outline-none bg-white rounded-3xl px-4 py-2 "
              type={isPasswordVisible ? "text" : "password"}
              placeholder="@15Ms#djhs4"
              {...register("password", { required: true })}
            />
            <p
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className=" absolute hover:cursor-pointer top-5 right-5 z-10 "
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </p>
          </div>
        </div>

        <button
          className=" transition-all duration-200 active:scale-95 active:bg-orange-100 hover:bg-orange-200 w-full bg-orange-300 text-white font-sans font-semibold px-4 py-2 rounded-3xl "
        >
          Submit
        </button>
      </form>

      {/* social media sign up section */}
      <div className=" mt-3 relative z-20 lg:w-[60%] sm:w-full flex items-center justify-between">
        <button className=" active:scale-95 active:bg-orange-200 transition-all hover:text-white duration-300 hover:bg-orange-300 flex items-center justify-center gap-2 bg-transparent border rounded-3xl px-4 py-2 text-xs ">
          <FaFacebook className="text-blue-400" />
          <span>Facebook</span>
        </button>
        <button className=" active:scale-95 active:bg-orange-200 transition-all hover:text-white duration-300 hover:bg-orange-300 flex items-center justify-center gap-2 bg-transparent border rounded-3xl px-4 py-2 text-xs ">
          <FaGoogle className=" text-green-400 " />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
}
