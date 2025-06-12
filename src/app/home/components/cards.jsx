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

const Cards = () => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <style jsx global>{`
                .card-gaming {
                    background: transparent;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
                    z-index: 1;
                    position: relative;
                    overflow: hidden;
                }
                .card-gaming:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                    z-index: 10;
                }
                .card-content {
                    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 1rem;
                    color: white;
                    font-family: 'Arial', sans-serif;
                    font-weight: bold;
                    text-transform: uppercase;
                }
            `}</style>
            <div className="relative w-full py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-12">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="card-gaming rounded-lg overflow-hidden"
                        >
                            <div className="relative h-80 w-full  border-2 border-gray-200">
                                <Image
                                    src={images[product.imageIndex]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="text-2xl">{product.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Cards;