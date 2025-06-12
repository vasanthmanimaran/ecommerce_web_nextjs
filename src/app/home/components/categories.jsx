"use client";

import React from 'react';
import Image from 'next/image';

const images = [
    "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1920", // GTA V
    "https://cdn.pixabay.com/photo/2013/07/12/17/47/car-152408_1280.jpg", // GTA Online
    "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1920", // RDR2
    "https://cdn.pixabay.com/photo/2015/09/09/19/43/campfire-932870_1280.jpg", // Red Dead Online
];

const products = [
    {
        id: 1,
        name: "GRAND THEFT AUTO V",
        imageIndex: 0,
    },
    {
        id: 2,
        name: "GRAND THEFT AUTO ONLINE",
        imageIndex: 1,
    },
    {
        id: 3,
        name: "RED DEAD REDEMPTION II",
        imageIndex: 2,
    },
    {
        id: 4,
        name: "RED DEAD ONLINE",
        imageIndex: 3,
    },
];

const Categories = () => {
    return (
        <div className='bg-black'>     
          <h1 className='py-16 flex justify-center text-4xl animate-pulse font-bold'>TOP SELLER</h1>      
            <div className="relative w-full">
            
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-20">
                  
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="card-gaming rounded-sm overflow-hidden"
                        >
                          
                            <div className="relative h-60 w-full  border-2 border-b-gray-900">
                                <Image
                                    src={images[product.imageIndex]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"/>
                            </div>
                            <div className="card-content">
                                <h3 className="text-xl animate-pulse">{product.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;