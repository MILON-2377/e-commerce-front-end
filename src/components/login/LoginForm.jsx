import Link from "next/link";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Title from "../Title";

export default function LoginForm() {
  return (
    <div className=" relative flex-1 flex flex-col items-center justify-center h-full p-5 ">
      {/* title */}
      <div className=" lg:left-[22%] absolute top-5 left-5 ">
        <Title />
      </div>

      <div className=" lg:w-[60%] w-full">
        <h5 className=" text-xl sm:text-2xl font-semibold ">Welcome back</h5>
        <p className="mt-2">
          <span className=" text-gray-400 ">Do not have an account?</span>
          <Link
            href={"/signup"}
            className=" hover:cursor-pointer ml-2 hover:underline text-sm text-orange-400 "
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* social media login section */}
      <div className=" lg:w-[60%] w-full  mt-5 ">
        <button className=" w-full active:scale-95 active:bg-orange-100 hover:text-white hover:bg-orange-300 transition-all duration-200 flex items-center justify-center gap-2 px-4 py-2 rounded-3xl bg-white ">
          <FaGoogle className="text-green-400" />
          <span>Continue with Google</span>
        </button>
        <button className=" mt-2 w-full active:scale-95 active:bg-orange-100 hover:text-white hover:bg-orange-300 transition-all duration-200 flex items-center justify-center gap-2 px-4 py-2 rounded-3xl bg-white ">
          <FaFacebook className="text-blue-400" />
          <span>Continue with Facebook</span>
        </button>
      </div>

      {/* form */}
      <form className=" lg:w-[60%] w-full mt-10 flex flex-col gap-5 ">
        <label>
          <span className=" font-semibold text-sm text-gray-400 font-sans ">
            Email
          </span>
          <input
            className=" mt-1 w-full px-4 py-2 rounded-3xl outline-none bg-white "
            type="text"
            placeholder="Enter your email"
          />
        </label>
        <label>
          <span className=" font-semibold text-sm text-gray-400 font-sans ">
            Password
          </span>
          <input
            className=" mt-1 w-full px-4 py-2 rounded-3xl outline-none bg-white "
            type="password"
            placeholder="Enter your email"
          />
        </label>
        <button className=" transition-all hover:bg-orange-300 active:scale-95 active:bg-orange-50 px-4 py-2 rounded-3xl bg-orange-400 text-white ">
          Log In
        </button>
      </form>
    </div>
  );
}
