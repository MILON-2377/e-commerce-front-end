"use client";
import DisplayedData from "@/components/shop/DisplayedData";
import Pagination from "@/components/shop/Pagination";
import React, { useState } from "react";

const categoriesData = [
  "Fashionware",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
];

const brandsData = [
  "Tiffany & Co.",
  "Cartier",
  "Pandora",
  "Bvlgari",
  "Swarovski",
];

const colorsData = ["Gold", "Silver", "Rose Gold", "Platinum", "Diamond White"];

const sizesData = ["S", "M", "L", "XL", "XXL"];

export default function Shop() {
  const [page, setPage] = useState(1);

  const handlePageChange = (p) => {
    setPage(p);
  }
  return (
    <div className="flex lg:flex-row flex-col-reverse gap-8 lg:w-[80%] mx-auto ">
      <div className=" mt-10 sticky w-full lg:w-[25%] px-5 lg:px-0 ">
        {/* categories */}
        <div>
          <h5 className=" lg:text-2xl font-semibold text-xl ">Categories</h5>
          <div className=" mt-5 mb-5 border-b w-full "></div>

          <ul className="">
            {categoriesData.map((i, ix) => (
              <li
                key={i + ix}
                className=" hover:cursor-pointer hover:text-orange-300 text-gray-400 mb-5 text-[18px] lg:text-[20px]  font-normal font-sans "
              >
                {i}
                <span className="ml-2">({ix + 5})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* price */}
        <div>
          <h5 className="text-xl font-bold">Price</h5>
          <div className=" mt-5 mb-5 border-b w-full "></div>

          <input
            type="range"
            min={0}
            max="100"
            value="40"
            className="range range-warning"
          />

          <div className=" font-sans flex items-center justify-between mt-8 ">
            <p className=" font-normal ">Price: $1 - $594</p>
            <button className=" px-4 transition-all hover:text-black active:scale-95 active:bg-orange-200 hover:bg-orange-300 font-semibold py-2 rounded-3xl bg-orange-300 text-white ">
              FILTER
            </button>
          </div>
        </div>

        {/* brand */}
        <div>
          <h5 className="text-xl font-bold">Brand</h5>
          <div className=" mt-5 mb-5 border-b w-full "></div>

          <div>
            {brandsData.map((i, ix) => (
              <div key={i + ix} className="form-control  ">
                <label className="cursor-pointer mb-3 flex items-center gap-4 ">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span className=" text-[18px] ">{i}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* color */}
        <div>
          <h5 className="text-xl font-bold">Color</h5>
          <div className=" mt-5 mb-5 border-b w-full "></div>

          <div>
            {colorsData.map((i, ix) => (
              <div key={i + ix} className="form-control  ">
                <label className="cursor-pointer mb-3 flex items-center gap-4 ">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span className=" text-[18px] ">{i}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* size */}
        <div>
          <h5 className="text-xl font-bold">Size</h5>
          <div className=" mt-5 mb-5 border-b w-full "></div>

          <div>
            {sizesData.map((i, ix) => (
              <div key={i + ix} className="form-control  ">
                <label className="cursor-pointer mb-3 flex items-center gap-4 ">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span className=" text-[18px] ">{i}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" mt-10 lg:mt-14 w-[95%] sm:w-[80%] lg:flex-1 mx-auto">
            
          {/* products */}
          <DisplayedData page={page} />


          {/* pagination */}
          <Pagination pageChange={handlePageChange} />
      </div>
    </div>
  );
}
