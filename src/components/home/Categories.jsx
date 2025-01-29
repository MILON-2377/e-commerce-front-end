import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const productsCategories = [
  {
    type: "Beautiful Wedding Rings",
    des: "Exquisite and timeless wedding rings to celebrate your special day.",
    image:
      "https://img.freepik.com/free-photo/smiling-blonde-young-woman-looking-her-ring-given-by-his-boyfriend_23-2147891259.jpg?t=st=1736750854~exp=1736754454~hmac=58cbeb197b566978ce02a517479b3a2bde3ff3159666d0e1e02c35019d3e39e6&w=360",
  },
  {
    type: "Elegant Necklaces",
    des: "Chic and stylish necklaces for any occasion.",
    image:
      "https://img.freepik.com/free-photo/cute-soft-caring-girlfriend-gazing-lovely-camera-smiling-sweet-tender-as-tilting-head-joyfully-posing-with-combed-hair-dress-accessories-white-wall_176420-35201.jpg?t=st=1736750779~exp=1736754379~hmac=cead219d6c7c5ff4734548eb134afd388e583a614b9a6cdce2cb3098a48b4c7e&w=1060",
  },
  {
    type: "Dazzling Earrings",
    des: "Stunning earrings to complement your style.",
    image:
      "https://img.freepik.com/free-photo/blonde-woman-showing-her-cute-colored-look_144627-4795.jpg?t=st=1736750884~exp=1736754484~hmac=09ff1ed187487699a3cce34ab1a24823b0fb8eed87f7199cd9257b6f429dbe7b&w=1060",
  },
  {
    type: "Luxury Bracelets",
    des: "Premium bracelets to add charm to your outfit.",
    image:
      "https://img.freepik.com/free-photo/young-brunette-model-demonstrating-jewelry_7502-7050.jpg?t=st=1736750810~exp=1736754410~hmac=375e683392faca86786d7e7b31dcc0f2c4500906ff14036a3656aa9fa59153c4&w=360",
  },
];

export default function Categories() {
  const [isHover, setIsHover] = useState("");
  return (
    <div className=" mt-8 sm:w-[80%] mx-auto lg:w-[70%] grid grid-cols-2 gap-5">
      {productsCategories.map((i, ix) => (
        <motion.div
          key={i.type}
          className=" relative hover:cursor-pointer overflow-hidden bg-cover bg-no-repeat bg-left  h-[40vh] flex items-center  bg-gray-50   "
          style={{
            backgroundImage: `url(${i.image})`,
            borderTop: "solid",
            borderLeft: "solid",
            borderRight: "solid",
            borderBottom: "solid",
          }}
          onHoverStart={() => setIsHover(ix)}
          onHoverEnd={() => setIsHover("")}
          initial={{ borderTopWidth: 0, borderColor: "transparent" }}
          animate={
            isHover === ix
              ? {
                  borderTopWidth: "1px",
                  borderColor: "orange",
                  borderBottomWidth: "1px",
                  borderLeftWidth: "1px",
                  borderRightWidth: "1px",
                }
              : {}
          }
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className=" absolute z-10 w-full h-full bg-orange-400  "
            initial={{ opacity: 0, height: "0" }}
            animate={isHover === ix ? { opacity: 0.1, height: "100%" } : {}}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className=" absolute right-5 top-[40%] ">
            <p className=" text-2xl  font-bold text-black ">{i.type}</p>
            <button className="underline text-xl text-black hover:text-orange-400 ">ShopNow</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
