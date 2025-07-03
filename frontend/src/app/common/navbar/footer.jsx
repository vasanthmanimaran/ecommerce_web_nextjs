"use client";

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white font-serif text-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4 tracking-wide">ShopMate</h3>
            <p className="text-white/70">
              Discover premium products with unbeatable quality and style. Fast delivery. Easy returns.
            </p>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Customer Support</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Order Status</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Affiliate</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Newsletter + Socials */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Join Our Newsletter</h4>
            <p className="text-white/60 mb-4">Get updates on latest deals and new arrivals.</p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white/30 focus:outline-none focus:ring focus:ring-white/50 placeholder-white/40"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white/80" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/80" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/80" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-white/50 text-xs">
          <p>© {new Date().getFullYear()} ShopMate. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
