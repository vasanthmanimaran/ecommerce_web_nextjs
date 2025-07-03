'use client';

import React, { useState, useEffect } from 'react';
import { getbanner } from '../services/services';
import ThreeJSBanner from '../bannerthreejs';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getbanner();
        if (response && Array.isArray(response)) {
          const fetched = response.map((banner) => ({
            id: banner._id,
            imageUrl: banner.imageUrl?.startsWith('/uploads')
              ? `http://localhost:7000${banner.imageUrl}`
              : banner.imageUrl,
            title: banner.title,
            subtitle: banner.subtitle,
            button: banner.button,
          }));
          setBanners(fetched);
        }
      } catch (err) {
        console.error('Banner fetch error:', err);
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

  if (!banners.length) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Show 3D background even while loading */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full z-0">
          <ThreeJSBanner />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl z-10">
          Loading banners...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute top-0 left-1/2 w-1/2 h-full z-0">
        <ThreeJSBanner />
      </div>

      {/* 🔤 Dynamic Slides */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <div className="flex flex-col md:flex-row h-full relative">
            {/* 🖼️ Banner Left Half (Image) */}
            <div
              className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

            </div>

            {/* 📝 Text Overlay (Right Half) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
              <div className="flex flex-col justify-center items-start px-6 py-10 bg-black/60 text-white h-full relative z-20">
                <h1 className="text-3xl md:text-5xl font-bold hover:text-yellow-300 duration-300 drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-xl mt-2 text-purple-400 drop-shadow-md">{banner.subtitle}</p>
                <button className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg">
                  {banner.button || 'Learn More'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 🔘 Pagination Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2 bg-black/60 px-4 py-2 rounded-lg shadow-md z-30 backdrop-blur-sm">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border border-white transition transform hover:scale-125 ${currentIndex === index ? 'bg-yellow-500 scale-110 shadow-lg' : 'bg-gray-300 hover:bg-gray-200'
              }`}
            disabled={isLoading}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;