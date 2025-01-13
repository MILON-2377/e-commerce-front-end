"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { navTitles } from "@/constants/Constants";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { FcAbout } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { FaCartPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

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

// user container dropdown
const UserDropDown = ({ setVisible }) => {
  const userTitles = ["Login", "Register", "My Account"];
  return (
    <div
      id="user-drop-down"
      onMouseLeave={() => setVisible(false)}
      className=" top-12 z-30 -left-5 right-5 sm:-left-10 sm:right-14 lg:right-20 rounded-md bg-gray-50 p-3 absolute "
    >
      {userTitles.map((i, ix) => (
        <p
          key={i + ix}
          className=" hover:text-blue-500 hover:bg-white px-2 py-1 rounded-md transition-all duration-200 hover:cursor-pointer "
        >
          {i}
        </p>
      ))}
    </div>
  );
};

// cart and user container
const Cart = () => {
  const [isUserHover, setIsUserHover] = useState(false);

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!(e.target.id === "user-con" || e.target.id === "user-i")) {
        console.log(e.target.id);
        setIsUserHover(false);
      }
    };

    window.addEventListener("click", handleDropDown);

    return () => window.removeEventListener("click", handleDropDown);
  }, []);
  return (
    <div className="flex gap-5 lg:w-[14%] items-center justify-end pr-2 sm:pr-5 relative ">
      <div
        id="user-con"
        onMouseEnter={() => setIsUserHover(true)}
        className=" text-[16px] sm:text-xl border p-2 rounded-full transition-all duration-200 hover:bg-blue-500 hover:text-white text-blue-500 hover:cursor-pointer "
      >
        <FaUserCircle id="user-i" />
      </div>

      <div className=" relative text-[16px] sm:text-[18px] border p-2 rounded-full transition-all duration-200 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer ">
        <div className=" absolute -top-3 left-5 text-xs px-1 text-white rounded-xl bg-orange-400 ">
          0
        </div>
        <FaCartPlus />
      </div>
      <div className=" relative bg-white text-[16px] sm:text-[18px] border p-2 rounded-full transition-all duration-200 hover:bg-red-500 text-red-500 hover:text-white hover:cursor-pointer ">
        <div className=" absolute -top-3 left-5 text-xs px-1 text-white rounded-xl bg-orange-400 ">
          0
        </div>

        <FaHeart />
      </div>

      {/* user drop down */}
      {isUserHover && <UserDropDown setVisible={setIsUserHover} />}
    </div>
  );
};

// title
const Title = () => {
  return (
    <div className="my-auto ml-1 lg:ml-5 ">
      <h1 className=" text-2xl lg:text-3xl font-bold text-orange-300 ">
        LuxeCarat
      </h1>
    </div>
  );
};

// nested navbar titles views
const NavItem = ({ items, hover, position }) => {
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
      className={` bg-orange-50 bg-opacity-80 w-[300px] z-30 absolute  overflow-hidden flex flex-col gap-2 p-5 `}
    >
      {[...items].map((i, ix) => (
        <motion.a
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            x: { duration: 0.5, delay: ix * 0.1 },
            opacity: { duration: 0.8 },
            backgroundColor: {
              duration: 0.5,
            },
            scale: {
              duration: 0.5,
            },
          }}
          key={i.title + ix}
          href={i.path}
          className="px-4 py-1 hover:bg-white transition-all duration-200 hover:text-blue-500 hover:font-medium rounded-md "
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
      initial={{ x: "-100%" }}
      animate={{
        x: drawer ? "0%" : "-100%",
      }}
      transition={{
        duration: 0.5,
      }}
      onClick={(e) => e.stopPropagation()}
      className="h-screen z-50 w-[300px] absolute top-0 p-5 bg-gray-100 flex flex-col gap-1 "
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

// for medium device
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
    <div className=" flex items-center justify-between h-20 ">
      <div className=" flex items-center ">
        {!isDrawerOpen && (
          <div
            onClick={() => setIsDrawerOpen(true)}
            className=" ml-1 h-[40px] hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer rounded-md w-[40px] flex items-center justify-center "
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

        {/* title */}
        <Title />
      </div>

      {/* cart section */}
      <Cart />
    </div>
  );
};

// Search container
const SearchContainer = () => {
  const [search, setSearch] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
  };

 

  return (
    <div>
      <form onSubmit={handleSearch} className="relative">
        <input
          id="input"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          type="search"
          className="border border-orange-300 w-[130%] outline-none px-3 py-2 rounded-3xl "
        />
      </form>
    </div>
  );
};

export default function Navbar() {
  const [isHover, setIsHover] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef([]);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const path = usePathname();


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

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" relative w-full border-b lg:border-none lg:h-20 bg-white ">
      {/* for large device */}
      <div className=" w-full h-full hidden lg:flex items-center justify-between ">
        {/* title */}
        <Title />
        {/* navigation title */}
        <div className=" flex items-center justify-center h-full gap-5 ">
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
                className={` ${path === i.path && "text-orange-300 font-medium"} relative px-4 py-1 rounded-3xl hover:cursor-pointer gap-1`}
              >
                {i.title}
              </motion.a>
            </div>
          ))}
        </div>

        {/* search container */}
        <SearchContainer />

        {/* cart section */}
        <Cart />
      </div>

      {/* nested navbar */}
      {isHover === "Shop" && (
        <NavItem
          hover={setIsHover}
          items={navTitles[1].items}
          position={hoverPosition}
        />
      )}
      {isHover === "Collections" && (
        <NavItem
          hover={setIsHover}
          items={navTitles[2].items}
          position={hoverPosition}
        />
      )}

      {/* for small devices */}
      {pageWidth <= 786 && <NavMedium />}
    </div>
  );
}
