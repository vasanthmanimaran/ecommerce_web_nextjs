"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import logo from "../../../../../public/newlogo.svg"; // Adjust path as needed

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    console.log("Search query:", query); // Replace with actual search logic
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false); // Close menu if search is opened
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false); // Close search if menu is opened
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black shadow-md font-serif">
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-3 max-w-screen-xl mx-auto">
        <div className="flex justify-center items-center w-full">        
          <div className="hidden lg:flex items-center gap-15">
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 transition-colors"
              aria-label="Home"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 transition-colors"
              aria-label="Products"
            >
              Products
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 transition-colors"
              aria-label="Categories"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 transition-colors"
              aria-label="Cart"
            >
              Cart
            </a>
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white bg-gray-800 w-40 sm:w-48 lg:w-64 transition-all"
                    autoFocus
                    aria-label="Search products"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    aria-label="Submit search"
                  >
                    <Search
                      className="w-5 h-5 text-white hover:text-yellow-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    />
                  </button>
                </form>
              ) : (
                <button
                  onClick={toggleSearch}
                  className="p-1"
                  aria-label="Open search"
                >
                  <Search
                    className="w-5 h-5 text-white hover:text-yellow-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  />
                </button>
              )}
            </div>
            <a
              href="#"
              className="text-white bg-black px-4 py-1.5 rounded-md hover:text-yellow-300 hover:border-yellow-300 hover:scale-105 transition-all ease-in-out border border-white duration-300 text-sm"
              aria-label="Login"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu and Search Buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleSearch}
              className="p-1"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              {isSearchOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Search className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
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
          <div className="lg:hidden mt-4 flex flex-col space-y-3 pb-4 transition-all duration-300 ease-in-out">
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 text-center py-1"
              aria-label="Home"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 text-center py-1"
              aria-label="Products"
            >
              Products
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 text-center py-1"
              aria-label="Categories"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-white text-base hover:text-yellow-300 text-center py-1"
              aria-label="Cart"
            >
              Cart
            </a>
            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="relative flex items-center w-full max-w-md mx-auto"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  className="border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white bg-gray-800 w-full"
                  autoFocus
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                  aria-label="Submit search"
                >
                  <Search
                    className="w-5 h-5 text-white hover:text-yellow-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  />
                </button>
              </form>
            )}
            <a
              href="#"
              className="text-white bg-black border border-white px-4 py-1.5 rounded-md hover:text-yellow-300 hover:border-yellow-300 hover:scale-105 transition-all duration-300 text-center text-sm"
              aria-label="Login"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;