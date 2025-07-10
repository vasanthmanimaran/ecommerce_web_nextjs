'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CardGrid = ({ cards }) => {
  const router = useRouter();

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-yellow-400 text-lg ${i >= rating ? 'opacity-30' : ''}`}
      >
        ★
      </span>
    ));

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cards.length > 0 ? (
          cards.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/product/${item.id}`)}
              className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden shadow-md bg-gray-900 hover:border-cyan-400 hover:shadow-lg transition w-full h-[420px] flex flex-col"
            >
              <div className="relative w-full h-[240px]">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition duration-300 rounded-t-xl"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold mb-2 text-center hover:text-cyan-400 transition line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex justify-center items-center mb-2">
                  {renderStars(item.ratings)}
                  <span className="ml-2 text-sm text-gray-400">
                    ({item.ratings.toFixed(1)})
                  </span>
                </div>
                <div className="text-center text-white font-bold text-lg mt-auto">
                  ₹{item.price?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
