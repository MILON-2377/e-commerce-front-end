"use client";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import NewCollection from "@/components/home/NewCollection";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <div className=" ">
      
      {/* hero */}
      <Hero />

      {/* new collection section */}
      {/* <NewCollection /> */}

      {/* products categories  */}
      <h5 className=" mt-36 mb-5 text-3xl font-bold w-[95%] sm:w-[80%] lg:w-[70%] mx-auto ">We are provides</h5>
      <Categories />

      {/* products */}
      <Products />

    </div>
  );
}
