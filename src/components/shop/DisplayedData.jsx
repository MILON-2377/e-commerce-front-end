"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import useProducts from "@/hooks/useProducts";
import { CiHeart } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { FaCheck, FaPlus, FaStar } from "react-icons/fa";
import { VscChromeMinimize } from "react-icons/vsc";
import useWishlist from "@/hooks/useWishlist";
import Swal from "sweetalert2";
import useCart from "@/hooks/useCart";

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

const AddToCartButton = ({ product }) => {
  const { addCartMutation } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartItem = (q,id,p) => {
    addCartMutation.mutate({quantity: q, productId: id, price: p});
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className=" absolute bottom-5 right-[30%] px-4 py-2 hover:bg-orange-300 hover:text-white rounded-3xl bg-white font-semiboldF "
      >
        View cart
      </button>

      <dialog id="my_modal_4" className="modal sm:w-full ">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
            <div>image</div>
            <div>images container</div>
          </div>
          <h2 className=" sm:text-2xl text-xl ">{product?.productName}</h2>
          <div>
            <p>start</p>
            <p>reviews</p>
          </div>
          <div className=" flex items-center gap-2 text-sm ">
            <FaCheck />
            <span>stocks</span>
          </div>
          <p>{product?.description}</p>

          {/* quantity button */}
          <div className=" mt-5 flex items-center justify-between w-[60%]  ">
            <p className=" text-xl font-semibold ">Quantity: </p>

            <div className=" px-6 py-2 gap-5 rounded-3xl flex items-center justify-center border bg-white ">
              <VscChromeMinimize
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="hover:cursor-pointer font-bold "
              />
              <span>{quantity}</span>
              <FaPlus
                onClick={() => setQuantity((prev) => prev + 1)}
                className=" hover:cursor-pointer "
              />
            </div>
            <button onClick={() => handleAddToCartItem(quantity, product._id, product.price)} className=" px-4 py-2 text-gray-100 bg-orange-400 hover:bg-orange-300 hover:text-white rounded-3xl font-semibold ">
              Add to cart
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const WishListAndViewCart = ({ product }) => {
  const [isButtonHover, setIsButtonHover] = useState(null);
  const { addMutation } = useWishlist();

  const handleAddWishes = ({ id, title }) => {
    if (title !== "Add to wishlist") {
      return;
    }

    addMutation.mutate(
      { id },
      {
        onError: (error) => {
          if (error.message === "Item is already in the wishlist") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Item already in the wishlist",
            });
          } else {
            console.error("Error adding to wishlist", error);
          }
        },
      }
    );
  };

  return (
    <div className=" absolute top-5 right-5 flex flex-col gap-3 ">
      {ViewAndWishlistData.map((i, ix) => (
        <div key={i.title + ix} className=" ">
          <button
            onMouseEnter={() => setIsButtonHover(i.title)}
            onMouseLeave={() => setIsButtonHover("")}
            onClick={() =>
              handleAddWishes({
                id: product._id,
                name: product.productName,
                title: i.title,
              })
            }
            className={` ${
              isButtonHover === i.title && " text-orange-300 "
            } bg-white p-2 text-xl rounded-full `}
          >
            {i.icon}
          </button>

          {isButtonHover === i.title && (
            <p
              key={ix}
              className={` ${
                isButtonHover === "Quick View" ? "top-14" : "top-[8px]"
              } absolute w-[100px] text-right right-12  text-sm font-medium font-sans `}
            >
              {i.title}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const ProductCart = ({ data }) => {
  const [isCartHover, setIsCartHover] = useState("");

  return (
    <motion.div
      onMouseEnter={() => setIsCartHover(data._id)}
      onMouseLeave={() => setIsCartHover("")}
      className=" relative bg-gray-50 overflow-hidden w-full h-[30vh] "
    >
      {isCartHover === data._id && <WishListAndViewCart product={data} />}
      {isCartHover && <AddToCartButton product={data} />}

      {/* animation */}
      {isCartHover === data._id && (
        <motion.div
          initial={{ width: "50%" }}
          animate={isCartHover === data._id ? { width: "0%" } : {}}
          transition={{ duration: 0.3 }}
          className="absolute left-0 h-full bg-orange-100 "
        ></motion.div>
      )}
      {isCartHover === data._id && (
        <motion.div
          initial={{ width: "50%" }}
          animate={isCartHover === data._id ? { width: "0%" } : {}}
          transition={{ duration: 0.3 }}
          className="absolute right-0 h-full bg-orange-100 "
        ></motion.div>
      )}
    </motion.div>
  );
};

const RatingsCart = ({ rating }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const len = Number(rating);
    const ratingArray = Array.from({ length: len }, (_, i) => i + 1);
    setRatings([...ratingArray]);
  }, []);

  return (
    <div className="flex items-center gap-2 ">
      {ratings?.map((i, ix) => (
        <FaStar key={i + ix} className=" text-orange-300 " />
      ))}
    </div>
  );
};

export default function DisplayedData({ page }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);

  const { data, isLoading, isError, isFetching } = useProducts({
    page,
    search,
    filters,
  });

  return (
    <div className=" w-full h-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      {data?.data?.products?.map((i, ix) => (
        <div key={i._id}>
          <ProductCart data={i} key={ix + 1} />

          <div className=" mt-5 flex flex-col gap-4 items-center justify-center ">
            <p className=" text-sm font-bold text-center ">{i?.brand}</p>

            {/* ratings */}
            <RatingsCart rating={i.averageRating} />

            {/* title */}
            <p className=" text-gray-500 text-xl text-center ">
              {i.productName}
            </p>

            {/* price */}
            <p>
              $<span className="text-orange-500 ml-1">{i.price}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
