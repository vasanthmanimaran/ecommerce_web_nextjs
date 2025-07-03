'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ correct for App Router
import { getcardbyid } from '@/app/home/services/services'; // adjust path if needed
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getcardbyid(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !product) return <div className="text-center text-red-500 py-20">{error || 'Product not found.'}</div>;

  return (
    <div className="bg-black text-white py-12 px-4 sm:px-10 md:px-20 font-sans min-h-screen mt-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[500px] border border-gray-600 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src={product.imageUrl}
            alt={product.alt}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-400">{product.alt}</p>
          <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-xl ${i + 1 <= product.ratings ? 'text-yellow-400' : 'text-gray-500'}`}>★</span>
            ))}
            <span className="text-sm text-gray-400">({product.ratings.toFixed(1)})</span>
            <span className="text-white font-bold text-lg">₹{product.price?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-black px-6 py-2 rounded hover:bg-black hover:text-white border hover:scale-105 border-white transition duration-700">
              Add to Cart
            </button>
            <Link href="/payment">
              <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition duration-700  hover:scale-105">
                Buy Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
