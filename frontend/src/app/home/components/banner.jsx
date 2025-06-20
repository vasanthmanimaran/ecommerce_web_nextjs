"use client";

import React, { useState, useEffect } from "react";
import { getbanner } from "../services/services";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await getbanner();
                if (response.data) {
                    const fetchedBanners = response.data.map((banner) => ({
                        id: banner._id,
                        imageUrl: banner.imageUrl?.startsWith("/uploads")
                            ? `http://localhost:3000${banner.imageUrl}`
                            : banner.imageUrl,
                        title: banner.title,
                        subtitle: banner.subtitle,
                        button: banner.button,
                    }));

                    setBanners(fetchedBanners);
                }
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length);
                setIsLoading(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const handleDotClick = (index) => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsLoading(false);
        }, 300);
    };

    if (banners.length === 0) {
        return <div className="text-center py-10">Loading banners...</div>;
    }

    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-black text-white overflow-hidden">
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${banner.imageUrl})`, }}>
                            <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-start px-6 py-10 bg-black/85">
                            <h1 className="text-3xl md:text-5xl font-bold hover:text-yellow-300 duration-300">
                                {banner.title}
                            </h1>
                            <p className="text-xl mt-2 text-[#7b318b]">{banner.subtitle}</p>
                            <button className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition">
                                {banner.button || "Learn More"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-4 right-4 flex gap-2 bg-black/40 px-4 py-2 rounded-lg shadow-md">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full border border-white ${currentIndex === index ? "bg-yellow-500 scale-110" : "bg-gray-300"
                            } transition`}
                        disabled={isLoading}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
