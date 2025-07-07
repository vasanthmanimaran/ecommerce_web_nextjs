'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
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
        const res = await axios.get('http://localhost:7004/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setRelatedProducts(res.data.relatedProducts);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, [router]);

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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {user.username}</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user._id}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/product/${product._id}`)}
              className="cursor-pointer border border-gray-700 rounded-lg p-4 bg-gray-900 hover:shadow-xl hover:border-yellow-400 transition"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.imageUrl.startsWith('/uploads') ? `http://localhost:7004${product.imageUrl}` : product.imageUrl}
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
      </div>
    </div>
  );
};

export default ProfilePage;
