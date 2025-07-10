'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useInView, useAnimation } from 'framer-motion';
import { getcard } from '../services/services';
import Bgfortopbrands from './bgfortopbrands';
import ShaderButton from '../threejsbutton';

function Cards() {
  const [cardsdata, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/home' || pathname === '/';

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await getcard();
        if (Array.isArray(response)) {
          const fetchedCards = response.map((card) => ({
            id: card._id,
            imageUrl: card.imageUrl?.startsWith('/uploads')
              ? `http://localhost:7004${card.imageUrl}`
              : card.imageUrl || '/fallback-image.jpg',
            title: card.title || 'Untitled',
            alt: card.alt || `Image for ${card.title || 'card'}`,
            ratings: card.ratings || 0,
          }));
          setCardsData(fetchedCards);
        } else {
          setError('No data received');
        }
      } catch {
        setError('Failed to load cards');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    if (isHome && isInView) controls.start('visible');
  }, [isHome, isInView, controls]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-500'}`}>★</span>
    ));

  const titleText = 'TOP BRANDS'.split('');

  return (
    <div className="relative w-full overflow-hidden">
      <Bgfortopbrands />
      {/* Main Content */}
      <div
        ref={ref}
        className="relative z-10 w-full max-w-screen-2xl mx-auto py-12 text-white"
      >
        <div className="py-8 flex justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100 animate-pulse">
            {titleText.map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-400"></div>
          </div>
        )}

        {error && <div className="text-center text-gray-400 font-semibold py-4">{error}</div>}

        {!isLoading && !error && (
          <div>
            {/* Grid of Cards (only first 8) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
              {cardsdata.slice(0, 8).map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="relative rounded-xl overflow-hidden shadow-xl bg-gray-900/80 border border-gray-700 transform transition-all duration-500 hover:scale-[1.06] hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] hover:border-cyan-400 group perspective cursor-pointer"
                >
                  <div className="relative w-full h-64 overflow-hidden transform-gpu transition-transform duration-500 group-hover:rotate-[0.5deg] group-hover:scale-105">
                    <div className="absolute inset-0">
                      <Image
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110 group-hover:grayscale-0 filter grayscale"
                        src={item.imageUrl}
                        alt={item.alt}
                        priority={index < 4}
                        placeholder="blur"
                        blurDataURL="/placeholder-image.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-center font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                      {item.title}
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex items-center space-x-1">
                        {renderStars(item.ratings)}
                        <span className="text-sm text-gray-400">({item.ratings.toFixed(1)})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {cardsdata.length > 8 && (
              <div className="mt-8 flex justify-center">
                <ShaderButton />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
