"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';

const images = [
    "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1920", // GTA V
    "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1920", // RDR2
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
];

const Categories = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const controls = useAnimation();

    React.useEffect(() => {
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
            className='bg-black w-full max-w-screen-2xl mx-auto py-12 text-white overflow-x-hidden'
        >
            <h1 className='py-16 flex justify-center text-4xl animate-pulse font-bold'>TOP SELLER</h1>
            <div className="relative w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            custom={index}
                            initial="hidden"
                            animate={controls}
                            variants={cardVariants}
                            className="relative rounded-xl overflow-hidden shadow-xl bg-black border border-gray-700 transform transition-all duration-500 hover:scale-[1.06] hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] hover:border-cyan-400 group perspective"
                            role="article"
                        >
                            <div className="relative w-full h-64 overflow-hidden transform-gpu transition-transform duration-500 group-hover:rotate-[0.5deg] group-hover:scale-105">
                                <motion.div
                                    variants={parallaxVariants}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110 group-hover:grayscale-0 filter grayscale"
                                        src={images[product.imageIndex]}
                                        alt={product.name}
                                        priority={index < 4}
                                        placeholder="blur"
                                        blurDataURL="/placeholder-image.jpg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                </motion.div>
                            </div>
                            <div className="p-4 text-center font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors duration-300">
                                {product.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Categories;