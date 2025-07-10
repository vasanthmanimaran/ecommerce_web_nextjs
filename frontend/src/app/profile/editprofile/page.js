'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile, updateUserProfile } from '@/app/home/services/services';

const EditProfilePage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        setForm({ username: data.user.username, email: data.user.email });
      } catch {
        setError('Failed to load profile');
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(form);
      router.push('/profile');
    } catch {
      setError('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Username"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Email"
        />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
