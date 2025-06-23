'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { getcard } from '../services/services';

function Cards() {
  const [cardsdata, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await getcard();
        if (response.data) {
          const fetchedCards = response.data.map((card) => ({
            id: card._id,
            imageUrl: card.imageUrl?.startsWith('/uploads')
              ? `http://localhost:3000${card.imageUrl}`
              : card.imageUrl || '/fallback-image.jpg',
            title: card.title || 'Untitled',
            alt: card.alt || `Image for ${card.title || 'card'}`,
          }));
          setCardsData(fetchedCards);
        } else {
          setError('No data received');
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
        setError('Failed to load cards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: i % 2 === 0 ? -100 : 100,
      y: 50,
      scale: 0.9,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const titleText = 'TOP BRANDS'.split('');
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
    }),
  };

  const parallaxVariants = {
    hidden: { y: 0 },
    visible: {
      y: 15,
      transition: { yoyo: Infinity, duration: 3.5, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full max-w-screen-2xl mx-auto py-12 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-x-hidden"
    >
      <div className="py-8 flex justify-center">
        <motion.h1
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100 animate-pulse"
        >
          {titleText.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-400"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-gray-400 font-semibold py-4">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
          {cardsdata.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              role="article"
              aria-labelledby={`card-title-${item.id}`}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <motion.div
                  variants={parallaxVariants}
                  className="absolute inset-0"
                >
                  <Image
                    fill
                    className="object-cover transition-opacity duration-300 hover:opacity-80 filter grayscale"
                    src={item.imageUrl}
                    alt={item.alt}
                    priority={index < 4}
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              </div>
              <div
                className="p-4 text-center font-semibold text-gray-100"
                id={`card-title-${item.id}`}
              >
                {item.title}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Cards;