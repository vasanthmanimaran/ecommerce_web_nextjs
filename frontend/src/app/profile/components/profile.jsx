'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getUserProfile } from '@/app/home/services/services';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
        setRelatedProducts(res.relatedProducts || []);
        setOrders(res.orders || []);
        setWishlist(res.wishlist || []);
        setAddresses(res.addresses || []);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };


    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-yellow-500 rounded-full border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 my-15">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10 space-y-2">
          <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user._id}</p>
          <button className="text-yellow-400 hover:underline mt-2" onClick={() => router.push('/profile/editprofile')}>
            Edit Profile
          </button>
        </div>

        {/* Wishlist */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div
                  key={product._id}
                  onClick={() => router.push(`/product/${product._id}`)}
                  className="cursor-pointer border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-yellow-400 transition"
                >
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.alt || 'Product image'}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-yellow-300">{product.title}</h3>
                  <p className="text-sm text-gray-400">₹{product.price}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No items in wishlist.</p>
            )}
          </div>
        </section>

        {/* Order History */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No past orders.</p>
          )}
        </section>

        {/* Address Book */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Address Book</h2>
          {addresses.length > 0 ? (
            addresses.map((address, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg mb-2 border border-gray-700">
                <p>{address.name}</p>
                <p>{address.street}, {address.city}, {address.state} - {address.zip}</p>
                <p>{address.country}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No addresses saved.</p>
          )}
          <button
            onClick={() => router.push('/profile/editaddress')}
            className="text-yellow-400 hover:underline mt-2"
          >
            Manage Addresses
          </button>
        </section>

        {/* Related Products */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/product/${product._id}`)}
                className="cursor-pointer border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-yellow-400 transition"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={
                      product.imageUrl.startsWith('/uploads')
                        ? `http://localhost:7004${product.imageUrl}`
                        : product.imageUrl
                    }
                    alt={product.alt || 'Product image'}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-300">{product.title}</h3>
                <p className="text-sm text-gray-400">Price: ₹{product.price}</p>
                <p className="text-sm text-gray-400">Type: {product.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <button
            onClick={() => router.push('/profile/change-password')}
            className="text-yellow-400 hover:underline"
          >
            Change Password
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
