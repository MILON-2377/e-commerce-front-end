import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiHeart } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import img1 from "../../../public/image1.jpg";
import img2 from "../../../public/image2.jpg";

// Title Animation Component
const TitleAnimation = () => {
  const title = "Our Products";
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;

    const handleDisplayTitle = () => {
      if (index < title.length) {
        setVisibleText((prev) => prev + title.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setVisibleText("");
          index = 0;
          startAnimation();
        }, 3000);
      }
    };

    const startAnimation = () => {
      interval = setInterval(handleDisplayTitle, 300);
    };

    let interval = setInterval(handleDisplayTitle, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-5">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundPosition: ["-200%", 0],
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          backgroundPosition: { duration: 3, repeat: Infinity },
        }}
        className="text-4xl text-center mt-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      >
        {visibleText}
      </motion.h1>
    </div>
  );
};

// animatate image
const ViewAndWishlistData = [
  {
    title: "Add to wishlist",
    icon: <CiHeart />,
  },
  {
    title: "Quick View",
    icon: <IoIosSearch />,
  },
];
const AnimateImage = () => {
  const [isImageHover, setIsImageHover] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState("");


  return (
    <div
      className=" relative w-full h-[70%] bg-center bg-cover bg-no-repeat bg-gray-50"
      style={{
        backgroundImage: `url(${img1})`,
      }}
      onMouseEnter={() => setIsImageHover(true)}
      onMouseLeave={() => setIsImageHover("")}
    >
      {/* icons section */}
      {isImageHover && (
        <div className=" absolute right-5 top-5 flex flex-col gap-1 w-[15%] ">
          {ViewAndWishlistData.map((i, ix) => (
            <div key={i.title + ix} className=" relative ">
              <button
                onMouseEnter={() => setIsButtonHover(i.title) }
                onMouseLeave={() => setIsButtonHover("")}
                className={` ${isButtonHover === i.title && " text-orange-300 "} bg-white p-2 text-xl rounded-full `}
              >
                {i.icon}
              </button>

              {isButtonHover === i.title && (
                <p
                  className={` absolute top-1 ${
                    i.title !== "Quick View" ? "-left-[105px]" : "-left-20"
                  } text-sm font-medium font-sans `}
                >
                  {i.title}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {isImageHover && (
        <button className=" absolute bottom-5 left-[25%] transition-all duration-300 font-[500] hover:bg-orange-300 hover:text-white px-4 py-2 rounded-3xl bg-white ">
          Add to cart
        </button>
      )}
    </div>
  );
};

// Products Slider Component
const RingSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full mt-10 h-[60vh] ">
      <Slider {...settings}>
        <div className=" mr-0 w-[38vw] h-[60vh] ">
          {/* Image Section */}
          <AnimateImage />

          {/* Product Details Section */}
          <div className="w-full h-auto mt-5 flex flex-col items-center justify-center">
            <p className="text-xl font-sans text-gray-400">Title</p>
            <div>
              <button className="p-1 border rounded-full bg-orange-300" />
            </div>
            <p className="text-xl font-medium">Description</p>
            <p>
              <span>$Price</span>
              <span className="text-sm ml-3 line-through text-gray-300">
                $Discount
              </span>
            </p>
          </div>
        </div>
        <div className=" mr-0 w-[38vw] h-[60vh]  ">
          {/* Image Section */}
          <AnimateImage />

          {/* Product Details Section */}
          <div className="w-full h-auto mt-5 flex flex-col items-center justify-center">
            <p className="text-xl font-sans text-gray-400">Title</p>
            <div>
              <button className="p-1 border rounded-full bg-orange-300" />
            </div>
            <p className="text-xl font-medium">Description</p>
            <p>
              <span>$Price</span>
              <span className="text-sm ml-3 line-through text-gray-300">
                $Discount
              </span>
            </p>
          </div>
        </div>
        <div className=" mr-0 w-[38vw] h-[60vh]  ">
          {/* Image Section */}
          <AnimateImage />

          {/* Product Details Section */}
          <div className="w-full h-auto mt-5 flex flex-col items-center justify-center">
            <p className="text-xl font-sans text-gray-400">Title</p>
            <div>
              <button className="p-1 border rounded-full bg-orange-300" />
            </div>
            <p className="text-xl font-medium">Description</p>
            <p>
              <span>$Price</span>
              <span className="text-sm ml-3 line-through text-gray-300">
                $Discount
              </span>
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

// Main Component
export default function Products() {
  return (
    <div className="mb-52 lg:w-[80%] mx-auto ">
      <TitleAnimation />
      <RingSlider />
    </div>
  );
}
