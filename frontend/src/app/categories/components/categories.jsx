'use client';

import React, { useEffect, useState } from 'react';
import { getcard } from '@/app/home/services/services';
import CardGrid from './cardgrid';
import TopFilterBar from './TopFilterBar';

const CategoriesContent = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 0,
    maxPrice: null,
  });

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
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    const { category, rating, maxPrice } = newFilters;
    const filtered = cardsData.filter((item) =>
      (category === 'all' || item.type === category) &&
      item.ratings >= rating &&
      (!maxPrice || item.price <= maxPrice)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-6">
      {/* Fixed Filter Bar */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-6xl z-50 px-4">
        <TopFilterBar
          categories={categories}
          currentFilters={filters}
          onApplyFilters={applyFilters}
        />
      </div>

      {/* Content below fixed bar */}
      <div className="pt-[160px]">
        <CardGrid cards={filteredData} />
      </div>
    </div>
  );
};

export default CategoriesContent;
