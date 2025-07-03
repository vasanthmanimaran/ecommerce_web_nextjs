"use client"; // 🔧 This makes the file a client component

import React from 'react';
import { usePathname } from 'next/navigation'; // ✅ Client-side hook
import Categories from './categories';
import Banner from './banner';
import Cards from './cards';

const Homemain = () => {
  const pathname = usePathname();

  return (
    <div className="bg-black">
      <Banner />
      <Cards key={pathname} /> {/* ✅ Forces fresh re-render */}
      <Categories />
    </div>  
  );
};

export default Homemain;
