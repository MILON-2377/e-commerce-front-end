"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { navTitles } from "@/constants/Constants";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { FcAbout } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

// icons
const icons = [
  {
    icon: <IoMdHome className="text-xl text-blue-500 " />,
  },
  {
    icon: <FaShoppingBag className=" text-blue-500 " />,
  },
  {
    icon: <HiOutlineCollection className="text-xl text-blue-500 " />,
  },
  {
    icon: <FcAbout className="text-xl text-blue-500 " />,
  },
];

// nested navbar titles views
const NestedShopNavTitleViews = ({ items, hover, position }) => {
  return (
    <motion.div
      onHoverEnd={() => hover("")}
      initial={{ height: "0px" }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.8 }}
      style={{
        top: `${position.y + 47}px`,
        left: `${position.x}px`,
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

// Drawer nav item displaying
const DrawerNavItem = () => {
  const [drawerHover, setDrawerHover] = useState(null);

  // handle hover for main titles
  const handleHoverStart = (index) => {
    setDrawerHover(index);
  };

  const handleHoverEnd = () => {
    setDrawerHover(null);
  };

  return (
    <>
      {navTitles.map((i, ix) => (
        <motion.div
          key={i.title + ix + "drawer open"}
          onMouseEnter={() => handleHoverStart(ix)}
          onMouseLeave={handleHoverEnd}
          animate={{
            height: drawerHover === ix && "auto",
          }}
          className={`px-4 py-2 ${
            !navTitles[drawerHover]?.items && "hover:bg-white"
          } transition-all duration-300 
           hover:cursor-pointer
          `}
        >
          <div className="flex items-center justify-between">
            {/* icons displaying */}
            <div className=" flex items-center gap-4 ">
              {icons[ix].icon}
              {i.title}
            </div>

            {navTitles[ix]?.items && (
              <motion.div
                animate={{
                  rotate: drawerHover === ix ? 0 : 180,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <IoIosArrowDown />
              </motion.div>
            )}
          </div>

          {/* nested title and path displaying */}
          {drawerHover === ix && navTitles[ix]?.items?.length > 0 && (
            <div className="pl-4">
              {navTitles[ix].items.map((subItem, subIx) => (
                <motion.a
                  key={subItem.title + subIx + "nested"}
                  whileHover={{ scale: 1.05 }}
                  className="block py-1 px-4 mt-2 hover:bg-white transition-all duration-300 hover:cursor-pointer "
                >
                  {subItem.title}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </>
  );
};

// drawer
const Drawer = ({ drawerRef, drawer, setDrawer }) => {
  return (
    <motion.div
      ref={drawerRef}
      initial={{x:"-100%"}}
      animate={{
        x: drawer ? "0%" : "-100%",
      }}
      transition={{
        duration: 0.5,
      }}
      onClick={(e) => e.stopPropagation()}
      className="h-screen w-[300px] absolute top-0 p-5 bg-gray-100 flex flex-col gap-1 "
    >
      <div className="flex items-center justify-end px-2">
        <div
          onClick={() => setDrawer(false)}
          className="flex items-center justify-center
            w-8 h-8
            bg-white
            rounded-full
            hover:bg-red-500
            transition-all duration-300 hover:cursor-pointer
            hover:text-white
        "
        >
          <RxCross2 className="text-xl" />
        </div>
      </div>

      <div className="border-t mt-5 mb-5  "></div>

      {/* drawer navbar items */}
      <DrawerNavItem />
    </motion.div>
  );
};

const NavMedium = () => {
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  return (
    <div>
      {!isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(true)}
          className=" h-[40px] hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer rounded-md w-[40px] flex items-center justify-center "
        >
          <CiMenuFries className="text-2xl font-bold " />
        </div>
      )}

      {/* drawer */}
      <Drawer
        drawerRef={drawerRef}
        drawer={isDrawerOpen}
        setDrawer={setIsDrawerOpen}
      />
    </div>
  );
};

export default function Navbar() {
  const [isHover, setIsHover] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef([]);

  const handlePositons = (index) => {
    const elemet = elementRef.current[index];
    if (elemet) {
      const rect = elemet.getBoundingClientRect();

      setHoverPosition({
        x: rect.x,
        y: rect.y,
      });
    }
  };

  return (
    <div className=" relative w-full lg:h-16 lg:bg-gray-100 ">
      <div className=" hidden lg:flex items-center justify-center h-full w-[60%] mx-auto gap-5 ">
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

      {/* for small devices */}
      <NavMedium />
    </div>
  );
}
