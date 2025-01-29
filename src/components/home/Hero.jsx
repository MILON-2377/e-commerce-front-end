import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

// heros data
const HeroData = [
  {
    title: "Family Jewelry Collection",
    des: "Designer Jewelry Necklaces and Earrings",
    image: "/image2.jpg",
  },
  {
    title: "Elegant Bridal Sets",
    des: "Beautifully Crafted Necklaces, Earrings, and Bracelets",
    image: "/image1.jpg",
  },
  {
    title: "Modern Men's Accessories",
    des: "Stylish Rings, Bracelets, and Cufflinks",
    image: "/image4.jpg",
  },
];

export default function Hero() {
  const [count, setCount] = useState(0);
  const [isHeroHover, setIsHeroHover] = useState(false);

  useEffect(() => {
    const handleSliderChange = () => {
      setCount((prev) => {
        if (prev === 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    };

    const interVal = setInterval(handleSliderChange, 4000);

    return () => {
      clearInterval(interVal);
    };
  }, [count]);

  // console.log(HeroData[count].image);

  return (
    <div
      onMouseEnter={() => setIsHeroHover(true)}
      onMouseLeave={() => setIsHeroHover(false)}
      className={`relative mask bg-cover bg-no-repeat bg-center  bg-white pr-10 p-5 overflow-hidden h-[40vh] sm:h-[60vh] lg:h-[80vh] flex  justify-between items-center `}
      style={{
        backgroundImage: `url(${HeroData[count].image})`,
      }}
    >
      <AnimatePresence key={count + 1} mode="wait">
        <div key={count + "id"} className=" lg:ml-14 ">
          {/* Title Element */}
          <motion.div
            initial={
              count < 1 ? { scale: 0.5, opacity: 0 } : { y: -100, opacity: 0 }
            }
            animate={
              count < 1 ? { scale: 1, opacity: 1 } : { y: 0, opacity: 1 }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              damping: 8,
              stiffness: 100,
            }}
            className="sm:ml-10 w-[60%] sm:mt-5 sm:w-[40%] lg:w-[60%] text-2xl font-medium sm:text-4xl lg:text-8xl font-serif"
          >
            {HeroData[count]?.title}
          </motion.div>

          {/* Description Element */}
          <motion.div
            initial={
              count < 2 ? { x: -100, opacity: 0 } : { scale: 0.9, opacity: 0 }
            }
            animate={
              count < 2 ? { x: 0, opacity: 1 } : { scale: 1, opacity: 1 }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="sm:text-xl sm:ml-10 mt-5 lg:mt-10 text-gray-400"
          >
            {HeroData[count]?.des}
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              damping: 9,
              stiffness: 100,
            }}
            className="mt-8 ml-10 "
          >
            <button className="px-4 py-2 rounded-md bg-orange-300 text-white font-medium">
              Read more
            </button>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* buttons for large device */}
      <button
        onClick={() => count > 0 && setCount((prev) => prev - 1)}
        className={
          isHeroHover
            ? ` hidden lg:block absolute left-5 text-4xl text-orange-300 top-[45%] `
            : "hidden"
        }
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={() => count < 2 && setCount((prev) => prev + 1)}
        className={` ${
          isHeroHover && "lg:block"
        } hidden absolute right-5 text-4xl text-orange-300 top-[45%] `}
      >
        <IoIosArrowForward />
      </button>

      {/* Buttons container for medium devices and mobile */}
      <div className=" lg:hidden absolute left-[40%] lg:left-[45%] bottom-3 lg:bottom-5 flex gap-4 ">
        {HeroData.map((i, ix) => (
          <>
            <button
              key={i.des + ix + "buttons keys"}
              onClick={() => setCount(ix)}
              className={`
                ${count === ix && "bg-blue-500"}
                p-[6px] rounded-full border-2 border-gray-400`}
            ></button>
          </>
        ))}
      </div>
    </div>
  );
}
