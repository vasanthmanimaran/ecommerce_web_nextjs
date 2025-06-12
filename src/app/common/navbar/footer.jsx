"use client";

import React from "react";
import logo1 from "../../../../public/newlogo.svg"; // Simplified path
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 shadow-md font-serif">
      <div className="flex flex-col w-full px-4 sm:px-6 max-w-screen-xl mx-auto py-6">
        <Image
          src={logo1}
          width={80}
          height={80}
          alt="Your Company Logo"
          className="inline-block mb-4 mt-5"
          priority
        />
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white/80 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 hover:scale-125 transition-transform duration-300" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white/80 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 hover:scale-125 transition-transform duration-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white/80 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 hover:scale-125 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;