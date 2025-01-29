"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import useProducts from "@/hooks/useProducts";

export default function DisplayedData({page}) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);

  const { data, isLoading, isError, isFetching } = useProducts({
    page,
    search,
    filters,
  });

  console.log(page)

  return (
    <div className=" w-full h-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      {data?.data?.products?.map((i, ix) => (
        <motion.div key={i._id} className="bg-gray-50 h-[40vh] p-5 ">
          <button className=" px-4 py-2 rounded-3xl bg-white hover:bg-orange-300 hover:text-white font-semibold ">
            Add to Cart
          </button>
        </motion.div>
      ))}
    </div>
  );
}
