'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getcard } from '../services/services';

function Cards() {
  const [cardsdata, setcarddata] = useState([]); // fix null map error

  useEffect(() => {
    const fetchcards = async () => {
      try {
        const response = await getcard();
        if (response.data) {
          const fetchedcards = response.data.map((card) => ({
            id: card._id,
            imageUrl: card.imageUrl?.startsWith("/uploads")
              ? `http://localhost:3000${card.imageUrl}`
              : card.imageUrl,
            title: card.title,
            alt: card.alt,
          }));

          setcarddata(fetchedcards); // fix setter function name
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchcards();
  }, []);

  return (
    <div className="relative w-full py-10 bg-gray-100">
      <div>
        <span>
          <h1 className="py-7 flex justify-center text-4xl animate-pulse font-bold text-black">
            TOP BRANDS
          </h1>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
        {cardsdata.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white"
          >
            <div className="relative w-full h-64">
              <Image
                fill
                className="object-cover"
                src={item.imageUrl || item.alt }
                alt={ item.title || "card image"}
              />
            </div>
            <div className="p-4 text-center font-semibold text-gray-800">
              {item.title || "No title available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
