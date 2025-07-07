'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Howl } from 'howler';
import { gettopseller } from '../services/services'; // Make sure this function works

const Categories = () => {
  const [topSellers, setTopSellers] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Hover sound
  const hoverSound = new Howl({
    src: ['/sounds/hover.wav'], // Make sure this file exists in /public/sounds/
    volume: 0.3,
  });

  // Fetch top sellers
  useEffect(() => {
    const fetchTopSellers = async () => {
      const data = await gettopseller();
      const formattedData = Array.isArray(data)
        ? data.map((item) => ({
            id: item._id,
            name: item.title || 'Untitled',
            imageUrl: item.imageUrl?.startsWith('/uploads')
              ? `http://localhost:7004${item.imageUrl}`
              : item.imageUrl || '/fallback-image.jpg',
            alt: item.alt || `Top seller image for ${item.title}`,
          }))
        : [];
      setTopSellers(formattedData);
    };

    fetchTopSellers();
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
      className="bg-black w-full max-w-screen-2xl mx-auto py-16 text-white overflow-x-hidden"
    >
      <h1 className="text-center text-4xl font-bold text-cyan-400 mb-10 animate-pulse">TOP SELLERS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8">
        {topSellers.map((item, index) => (
          <Tilt
            key={item.id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable={true}
            glareColor="cyan"
            glarePosition="all"
            scale={1.05}
            transitionSpeed={250}
          >
            <motion.div
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              onMouseEnter={() => hoverSound.play()}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#000000] hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] group transition-transform duration-500"
            >
              {/* Holographic scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[url('/scanlines.svg')] opacity-10 mix-blend-overlay z-10" />

              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden z-0">
                <motion.div variants={parallaxVariants} className="absolute inset-0">
                  <Image
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    src={item.imageUrl}
                    alt={item.alt}
                    priority={index < 4}
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="p-4 text-center font-bold text-cyan-200 text-lg tracking-wide group-hover:text-cyan-300 transition duration-300 z-20">
                {item.name}
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
