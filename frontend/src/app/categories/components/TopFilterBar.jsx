'use client';

import React, { useState } from 'react';

const TopFilterBar = ({ categories, currentFilters, onApplyFilters }) => {
    const [tempCategory, setTempCategory] = useState(currentFilters.category || 'all');
    const [tempMaxPrice, setTempMaxPrice] = useState(currentFilters.maxPrice || '');
    const [tempRating, setTempRating] = useState(currentFilters.rating || 0);

    const handleConfirm = () => {
        onApplyFilters({
            category: tempCategory,
            maxPrice: tempMaxPrice,
            rating: tempRating,
        });
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl my-6">
            {/* Background Video Component */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-xl overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/bgvideo3.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Glass Filter Bar */}
            <div className="relative z-10  bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-cyan-500 shadow-xl p-6 rounded-xl flex flex-wrap items-center justify-center gap-4">
                <select
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                    className="bg-gray-900/70 text-white border border-cyan-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Max Price"
                    value={tempMaxPrice}
                    onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                    className="bg-gray-900/70 text-white border border-cyan-400 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />

                <select
                    value={tempRating}
                    onChange={(e) => setTempRating(Number(e.target.value))}
                    className="bg-gray-900/70 text-white border border-cyan-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                >
                    <option value={0}>All Ratings</option>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating}★ & up
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleConfirm}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-2 px-6 rounded-lg transition-all shadow-md"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default TopFilterBar;
