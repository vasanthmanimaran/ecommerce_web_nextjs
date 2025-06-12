"use client";

import React, { useState, useEffect } from "react";

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const images = [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ];

    // Content for each image
    const contentData = [
        {
            title: "GRAND THEFT AUTO VI",
            subtitle: "OPEN WORLD ADVENTURE",
            date: "MAY 26, 2026",
            buttonText: "PRE ORDER AVAILABLE",
            description: "Experience the ultimate open-world adventure.",
            trailerText: "Watch Trailer 1 Now",
            learnMoreLink: "#trailer1",
        },
        {
            title: "CYBERPUNK LEGENDS",
            subtitle: "FUTURISTIC RPG",
            date: "JUNE 15, 2026",
            buttonText: "JOIN BETA NOW",
            description: "Dive into a neon-lit dystopian world.",
            trailerText: "Watch Trailer 2 Now",
            learnMoreLink: "#trailer2",
        },
        {
            title: "SPACE ODYSSEY",
            subtitle: "GALACTIC EXPLORATION",
            date: "JULY 10, 2026",
            buttonText: "RESERVE YOUR SPOT",
            description: "Explore the cosmos in an epic journey.",
            trailerText: "Watch Trailer 3 Now",
            learnMoreLink: "#trailer3",
        },
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                setIsLoading(false);
            }, 300); // Simulate loading delay
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    const handleDotClick = (index) => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentImage(index);
            setIsLoading(false);
        }, 300); // Simulate loading delay
    };

    return (
        <div className="mt-19 relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-black text-white overflow-hidden">
            {/* Split Layout */}
            <div className="flex flex-col md:flex-row h-full">
                {/* Left Section: Image */}
                <div
                    className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center transition-all duration-500"
                    style={{
                        backgroundImage: `url('${images[currentImage]}')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Right Section: Content and Buy Now Button */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between items-center md:items-start py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12 bg-black/85">
                    <div className="flex flex-col justify-between h-full max-w-screen-xl mx-auto w-full">
                        {/* Top Content */}
                        <div>
                            <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[80px] font-bold tracking-wide leading-tight hover:text-yellow-300 duration-300 truncate">
                                {contentData[currentImage].title}
                            </h1>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#7b318b]">
                                    {contentData[currentImage].subtitle}
                                </span>
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium hover:text-yellow-300 duration-300">
                                    {contentData[currentImage].date}
                                </span>
                            </div>
                            <div className="text-center md:text-left my-4">
                                <button
                                    className="px-5 py-2 sm:px-6 sm:py-3 bg-yellow-400 text-black font-semibold text-sm sm:text-base rounded hover:bg-yellow-500 transition-colors duration-300 touch-manipulation"
                                >
                                    {contentData[currentImage].buttonText}
                                </button>
                            </div>
                        </div>

                        {/* Bottom Content */}
                        <div className="text-center md:text-left">
                            <p className="text-sm sm:text-sm md:text-base lg:text-lg font-medium">
                                {contentData[currentImage].description}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
                                {contentData[currentImage].trailerText}
                            </p>
                            <a
                                href={contentData[currentImage].learnMoreLink}
                                className="inline-block px-4 py-1.5 text-sm font-semibold text-white bg-black border border-white rounded-md 
                                hover:text-yellow-300 hover:border-yellow-300 hover:scale-105 
                                transition duration-300 ease-in-out"
                            >
                                LEARN MORE
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-8 flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-black/40 to-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300/60 ${currentImage === index
                                ? 'bg-yellow-500 scale-110 border-yellow-500'
                                : 'bg-gray-200/80 hover:bg-yellow-400'
                            } transition-all duration-200 ease-out ${isLoading && currentImage === index ? 'animate-pulse' : ''
                            } touch-manipulation focus:outline-none focus:ring-1 focus:ring-yellow-500/70`}
                        disabled={isLoading}
                        aria-label={`Go to image ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;