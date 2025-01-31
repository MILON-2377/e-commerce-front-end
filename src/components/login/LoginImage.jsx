import React from "react";
import img from "../../../public/signupimage.webp";
import Image from "next/image";

export default function LoginImage() {
  return (
    <div className=" h-full sm:w-[55%] ">
      <Image
        src={img}
        alt="log in image"
        className=" w-full h-full object-cover "
      />
    </div>
  );
}
