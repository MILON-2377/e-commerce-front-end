"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { navTitles } from "@/constants/Constants";

// nested navbar titles views
const NestedShopNavTitleViews = ({ items, hover, position }) => {
 
  return (
    <motion.div
      onHoverEnd={() => hover("")}
      initial={{ height: "0px" }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.8 }}
      style={{
        top:`${position.y + 47}px`,
        left:`${position.x}px`
      }}
      className={` bg-gray-50 w-[300px] absolute  overflow-hidden flex flex-col gap-2 p-5 `}
    >
      {[...items].map((i, ix) => (
        <motion.a
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ backgroundColor: "blue" }}
          transition={{
            x: { duration: 0.8 },
            opacity: { duration: 0.8 },
            backgroundColor: {
              duration: 0.5,
            },
          }}
          key={i.title + ix}
          href={i.path}
        >
          {i.title}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function Navbar() {
  const [isHover, setIsHover] = useState("");
  const [hoverPosition, setHoverPosition] = useState({x:0, y:0});
  const elementRef = useRef([]);

  const handlePositons = (index) => {
    const elemet = elementRef.current[index];
    if(elemet){
      const rect = elemet.getBoundingClientRect();

      setHoverPosition({
        x:rect.x,
        y:rect.y,
      });

    }
  }



  return (
    <div className=" relative w-full h-16 bg-gray-100 ">
      <div className=" flex items-center justify-center h-full w-[60%] mx-auto gap-5 ">
        {navTitles.map((i, ix) => (
          <div key={i.title + ix + "div"} className="relative">
            <motion.a
              key={ix + i.title}
              href={i.path}
              ref={(el) => (elementRef.current[ix] = el)}
              onHoverStart={() => {
                setIsHover(i.title);
                handlePositons(ix);
              }}
              className=" relative px-4 py-1 rounded-3xl hover:cursor-pointer gap-1"
            >
              {i.title}
            </motion.a>
          </div>
        ))}
      </div>

      {/* nested navbar */}
      {isHover === "Shop" && (
        <NestedShopNavTitleViews
          hover={setIsHover}
          items={navTitles[1].items}
          position={hoverPosition}
        />
      )}
      {isHover === "Collections" && (
        <NestedShopNavTitleViews
          hover={setIsHover}
          items={navTitles[2].items}
          position={hoverPosition}
        />
      )}
    </div>
  );
}
