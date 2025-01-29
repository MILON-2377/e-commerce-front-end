"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Pagination({ pageChange }) {
  const [totalPages, setTotalPages] = useState([]);
  const [pages, setPages] = useState(1);
  const [totals, setTotals] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://wellness-care-backend.vercel.app/api/v1/product/totalCount"
      );
      const data = await res.json();
      setTotals(data?.data?.total);
      const total = Math.ceil(data?.data?.total / 10);

      const array = Array.from({ length: total }, (_, index) => index + 1);
      setTotalPages([...array]);
    };

    fetchData();
  }, []);


  const handlePrevPageChange = () => {
    if(pages > 1){
      const currentPage = pages - 1;
      pageChange(currentPage);
      setPages(prev => prev - 1);
    }
  }

  const handlePageChange = (i) => {
    pageChange(i);
    setPages(i);
  };


  const handleNextPageChange = () => {
    if(pages < totals){
      const currentPage = pages + 1;
      pageChange(currentPage);
      setPages(prev => prev + 1);
    }
  } 

  // console.log(pages);


  return (
    <div className=" mt-10 flex items-center gap-1 justify-center w-[95%] sm:w-[35%] lg:w-[30%] mx-auto ">
      <button onClick={handlePrevPageChange} className="p-1 w-7 h-7 flex items-center justify-center rounded-full border bg-gray-50 hover:bg-orange-300 hover:text-white ">
        <IoIosArrowBack />
      </button>
      {totalPages.length > 0 ? (
        totalPages.map((i, ix) => (
          <button
            key={i + ix}
            onClick={() => handlePageChange(i)}
            className={` ${pages === i ? "bg-orange-300 text-white" : ""} p-1 w-7 h-7 flex items-center justify-center rounded-full border bg-gray-50 hover:bg-orange-300 hover:text-white `}
          >
            {i}
          </button>
        ))
      ) : (
        <button className="p-1 w-7 h-7 flex items-center justify-center rounded-full border bg-gray-50 hover:bg-orange-300 hover:text-white ">
          1
        </button>
      )}
      <button
      onClick={handleNextPageChange}
        className="p-1 w-7 h-7 flex itmes-c
       justify-center rounded-full border bg-gray-50 hover:bg-orange-300 hover:text-white "
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
