import React from 'react';
import img from "../../../public/signupimage.webp";
import Image from 'next/image';

export default function SignUpImage() {
  return (
    <div className=' hidden sm:block  w-[55%] h-full '>
      <Image src={img} alt='sign up image'
       className=' w-full h-full object-cover '
      />
    </div>
  )
}
