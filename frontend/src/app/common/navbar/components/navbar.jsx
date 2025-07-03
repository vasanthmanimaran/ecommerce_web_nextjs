"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    console.log("Search query:", query);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  return (
    <nav className="fixed flex top-0 z-50 w-full bg-black shadow-md shadow-gray-900 font-sans">
      <div className="max-w-screen-xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/home" className="text-white hover:text-yellow-300 text-sm">Home</Link>
            <Link href="/allproducts" className="text-white hover:text-yellow-300 text-sm">All Products</Link>
            <Link href="/categories" className="text-white hover:text-yellow-300 text-sm">Categories</Link>
            <Link href="/cart" className="text-white hover:text-yellow-300 text-sm">Cart</Link>
            <Link href="/login" className="text-white border border-white px-4 py-1.5 rounded hover:border-yellow-300 hover:text-yellow-300 hover:scale-105 transition duration-300 text-sm">Login</Link>

            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="bg-gray-800 text-white border border-gray-600 rounded-md py-1.5 px-3 w-48 focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Search className="h-4 w-4 text-white" />
                  </button>
                </form>
              ) : (
                <button onClick={toggleSearch} aria-label="Open search">
                  <Search className="h-5 w-5 text-white hover:text-yellow-300" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={toggleSearch} aria-label="Search toggle">
              {isSearchOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Search className="w-6 h-6 text-white" />
              )}
            </button>
            <button onClick={toggleMenu} aria-label="Menu toggle">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col space-y-3 pb-4">
            <Link href="/home" className="text-white hover:text-yellow-300 text-center text-sm">Home</Link>
            <Link href="/allproducts" className="text-white hover:text-yellow-300 text-center text-sm">All Products</Link>
            <Link href="/categories" className="text-white hover:text-yellow-300 text-center text-sm">Categories</Link>
            <Link href="/cart" className="text-white hover:text-yellow-300 text-center text-sm">Cart</Link>
            <Link href="/login" className="text-white text-sm border border-white py-1 px-4 mx-auto rounded hover:text-yellow-300 hover:border-yellow-300 transition">Login</Link>
          </div>
        )}

        {/* Mobile Search */}
        {isSearchOpen && !isMenuOpen && (
          <div className="mt-2 lg:hidden">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
