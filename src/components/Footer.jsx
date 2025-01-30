"use client";
import React from "react";
import { IoMdHome } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaYoutubeSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  if(pathName === "/signup" || pathName === "/login") return null;
  return (
    <div className=" mt-20 bg-gray-100 lg:py-10 ">
      <section className=" w-[95%] sm:py-10 sm:w-[90%] lg:w-[80%] mx-auto flex sm:flex-col lg:flex-row sm:gap-8  lg:items-center justify-between ">
        <div className=" w-[36%] ">
          <h1 className=" sm:text-xl font-bold ">LuxeCarat</h1>
          <p className="sm:text-sm text-gray-400 mt-5 ">
            Luxecart offers a curated collection of high-quality, customizable
            jewelry pieces designed to add elegance to every occasion. Discover
            timeless styles and express your unique personality with our
            expertly crafted pieces. Crafted for you, by Luxecart.
          </p>
        </div>

        {/* contact */}
        <div>
          <h3 className=" text-xl font-semibold ">
            Contact Us
          </h3>

          <div className=" mt-5 flex flex-col gap-3 lg:gap-3 text-white ">
            <p className="text-gray-500  flex items-center gap-2 ">
              <IoMdHome className="text-xl" />
              <span className="text-sm">China west normal university</span>
            </p>
            <p className="text-gray-500  flex items-center gap-2 ">
              <MdEmail />
              <span class=" hover:cursor-pointer hover:text-orange-300 text-sm origin-left transform hover:scale-x-125 duration-300  ">
                milon.miah@qq.com
              </span>
            </p>
            <p className="text-gray-500  flex items-center gap-2 ">
              <FaPhoneAlt />
              <span class=" hover:cursor-pointer hover:text-orange-300 text-sm origin-left transform hover:scale-x-125 duration-300  ">
                (+86) 17778382743
              </span>
            </p>
          </div>
        </div>

        {/* information */}
        <div>
          <h3 className=" text-xl font-semibold ">Information</h3>
          <div className=" mt-5 sm:w-[60%] lg:w-auto text-sm font-sans flex items-center gap-3 lg:gap-5 justify-between ">
            <ul className="flex flex-col lg:gap-3 gap-1 ">
              <li className=" hover:text-orange-300 hover:cursor-pointer ">
                About us
              </li>
              <li className=" hover:text-orange-300 hover:cursor-pointer ">
                Privat Policy
              </li>
              <li className=" hover:text-orange-300 hover:cursor-pointer ">
                Contact Us
              </li>
            </ul>
            <ul className="flex flex-col lg:gap-3 gap-1 ">
              <li className="hover:text-orange-300 hover:cursor-pointer ">
                Delivery Information
              </li>
              <li className="hover:text-orange-300 hover:cursor-pointer ">
                Terms & Conditions
              </li>
              <li className="hover:text-orange-300 hover:cursor-pointer ">
                Site Map
              </li>
            </ul>
          </div>
        </div>

        {/* follow us */}
        <div >
          <h3 className=" text-xl lg:-mt-[4vh] font-semibold ">Follow Us</h3>
          <div className=" mt-10 flex items-center gap-4 ">
            <button className=" hover:bg-orange-300 hover:text-white p-2 rounded-full border bg-gray-50 ">
              <FaFacebookF />
            </button>
            <button className=" hover:bg-orange-300 hover:text-white p-2 rounded-full border bg-gray-50 ">
              <FaInstagramSquare />
            </button>
            <button className=" hover:bg-orange-300 hover:text-white p-2 rounded-full border bg-gray-50 ">
              <FaTwitter />
            </button>
            <button className=" hover:bg-orange-300 hover:text-white p-2 rounded-full border bg-gray-50 ">
              <FaYoutubeSquare />
            </button>
          </div>
        </div>
      </section>

      <section className=" w-[95%] pb-10 sm:w-[90%] mt-10 lg:w-[80%] mx-auto ">
        {/* subscribe */}
        <div className=" sm:w-[68%] ">
          <h3 className="text-[18px] font-bold ">Signup for newsletter</h3>

          <label className=" flex items-center justify-between ">
            <input
              type="email"
              placeholder="Enter your email address"
              className=" bg-transparent outline-none border-none placeholder:text-sm placeholder:text-gray-400 "
            />
            <button className=" active:scale-95 active:text-orange-200 text-orange-300 font-semibold transition-all duration-300 hover:text-black ">
              Subscribe
            </button>
          </label>
          <div className=" mt-2 border-b w-full "></div>
        </div>
      </section>

    </div>
  );
}
