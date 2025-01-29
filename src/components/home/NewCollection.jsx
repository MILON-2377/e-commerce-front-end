import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import image4 from "../../../public/image4.jpg";

const newCollectionData = [
  {
    img: "https://img.freepik.com/free-photo/beautiful-young-woman-with-bare-shoulders_23-2148341371.jpg?t=st=1736918606~exp=1736922206~hmac=db2456f795092bb3dd9953df3a225d8978b673bac4ad10c9d9fb5bae05e0da82&w=360",
  },
  {
    img: "https://img.freepik.com/free-photo/charming-model-with-dark-hair-shows-rich-golden-earrings-necklace-ring_8353-5040.jpg?t=st=1736918686~exp=1736922286~hmac=d7cc65733526885c699f9774ca27a1a720906507224a4c9346a3c6c3124c3c0c&w=360",
  },
];

export default function NewCollection() {
  return (
    <div className="mt-52">
      <h4 className=" sm:text-3xl text-center underline font-serif font-bold lg:text-4xl ">
        NEW COLLECTION
      </h4>
      <div>
        <motion.div className=" sm:w-[60%] sm:h-[40vh]"
        >
          <Image src={"https://img.freepik.com/free-photo/beautiful-young-woman-with-bare-shoulders_23-2148341371.jpg?t=st=1736918606~exp=1736922206~hmac=db2456f795092bb3dd9953df3a225d8978b673bac4ad10c9d9fb5bae05e0da82&w=360"} alt="image 4" 
          width={400}
          height={400}
          
          />
        </motion.div>
      </div>
    </div>
  );
}
