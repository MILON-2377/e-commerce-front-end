"use client";
import Signup from "@/components/register/Signup";
import SignUpImage from "@/components/register/SignUpImage";
import React from "react";

export default function SignUp() {
  return (
    <div className=" flex items-center justify-between h-screen w-full bg-gradient-to-t from-orange-100 to-orange-50">
      <Signup />
      <SignUpImage />
    </div>
  );
}
