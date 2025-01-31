import LoginForm from "@/components/login/LoginForm";
import LoginImage from "@/components/login/LoginImage";
import React from "react";

export default function Login() {
  return (
    <div className=" flex items-center justify-between h-screen w-full bg-gradient-to-t from-orange-100 to-orange-50">
        <LoginForm />
        <LoginImage />
    </div>
  );
}
