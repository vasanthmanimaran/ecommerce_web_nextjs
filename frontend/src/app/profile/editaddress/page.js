'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateAddress, getUserProfile } from '@/app/home/services/services';

const EditAddressPage = () => {
  const router = useRouter();
  const params = useParams();
  const addressId = params.id;
  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await getUserProfile(); // use profile to fetch all addresses
        const addr = data.addresses.find((a) => a._id === addressId);
        if (!addr) throw new Error('Address not found');
        setForm(addr);
      } catch {
        setError('Failed to load address');
      }
    };
    loadAddress();
  }, [addressId]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(addressId, form);
      router.push('/profile');
    } catch {
      setError('Failed to update address');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Address</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {['name', 'street', 'city', 'state', 'zip', 'country'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default EditAddressPage;
