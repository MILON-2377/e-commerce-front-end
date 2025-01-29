import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [currentHoverInput, setCurrentHoverInput] = useState("");
  const {register, handleSubmit, formState:{errors}} = useForm();

  const handleFormSubmit = async(data) => {
    const {name, email, password} = data;
    console.log(data);
    try {
        const response = await fetch('http://localhost:8000/api/v1/users/register', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({...data}),
        });

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className=" lg:w-[40%] mx-auto sm:w-[70%] px-8 py-5 bg-gray-50 shadow-lg ">
      <h5 className=" text-2xl font-bold mb-5 ">Register for an Account</h5>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
        <input
          onChange={() => setCurrentHoverInput("name")}
          type="text"
          className={` ${
            currentHoverInput === "name" && "border-orange-300"
          } border px-4 py-3 w-full text-sm outline-none   `}
          placeholder="FullName"
          {...register("name", {required:true})}
        />

        {/* email */}
        <input
          onChange={() => setCurrentHoverInput("email")}
          required={true}
          type="email"
          className={` ${
            currentHoverInput === "email" && "border-orange-300"
          } border px-4 py-3 w-full text-sm outline-none   `}
          placeholder="Enter your email"
          {...register("email", {required:true})}
        />

        {/* password */}
        <input
          onChange={() => setCurrentHoverInput("pass")}
          type="password"
          required={true}
          className={` ${
            currentHoverInput === "pass" && "border-orange-300"
          } border px-4 py-3 w-full text-sm outline-none   `}
          placeholder="Enter your password"
          {...register("password", {required:true})}
        />
        <input
          onChange={() => setCurrentHoverInput("re-pass")}
          required={true}
          type="password"
          className={` ${
            currentHoverInput === "re-pass" && "border-orange-300"
          } border px-4 py-3 w-full text-sm outline-none   `}
          placeholder="Repeat your password"
          {...register("confirm-password", {required:true})}
        />

        <div>
          <button className={` px-4 py-2 bg-gray-50 text-xl font-semibold border   `}>Sign up</button>
        </div>
      </form>
    </div>
  );
}
