'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { getcard } from '../../home/services/services';

const CategoriesContent = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || null;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getcard();
        if (Array.isArray(response)) {
          const formatted = response.map((card) => ({
            id: card._id,
            imageUrl: card.imageUrl?.startsWith('/uploads')
              ? `http://localhost:7004${card.imageUrl}`
              : card.imageUrl || '/fallback-image.jpg',
            title: card.title || 'Untitled',
            alt: card.alt || `Image for ${card.title || 'card'}`,
            ratings: card.ratings || 0,
            price: card.price || 0,
            type: card.type || 'uncategorized',
          }));
          setCardsData(formatted);
          setFilteredData(formatted);
          const types = ['all', ...new Set(formatted.map(item => item.type))];
          setCategories(types);
        } else {
          setError('No products available');
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    if (searchQuery && cardsData.length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = cardsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setSelectedCategory('all');
    }
  }, [searchQuery, cardsData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredData(
      category === 'all' 
        ? cardsData 
        : cardsData.filter(item => item.type === category)
    );
  };

  const renderStars = (rating) => (
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-yellow-400 text-lg ${i >= rating ? 'opacity-30' : ''}`}>★</span>
    ))
  );

  if (isLoading) return null; // Loading handled by Suspense

  if (error) return <div className="text-center text-red-400 text-lg">{error}</div>;

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-8 md:px-16 my-10">
      <h1 className="text-3xl font-bold text-center mb-6">Browse by Category</h1>

      {searchQuery && (
        <h2 className="text-center text-gray-300 mb-6 text-sm">
          Showing results for: <span className="text-cyan-400">"{searchQuery}"</span>
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-cyan-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/product/${item.id}`)}
              className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden shadow-md bg-gray-900 hover:border-cyan-400 hover:shadow-lg transition"
            >
              <div className="relative w-full h-64">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-center hover:text-cyan-400 transition">
                  {item.title}
                </h3>
                <div className="flex justify-center items-center">
                  {renderStars(item.ratings)}
                  <span className="ml-2 text-sm text-gray-400">
                    ({item.ratings.toFixed(1)})
                  </span>
                </div>
                <div className="text-center text-white font-bold text-lg">
                  ₹{item.price?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesContent;