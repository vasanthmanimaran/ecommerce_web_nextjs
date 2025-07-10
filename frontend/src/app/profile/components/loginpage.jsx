'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/app/home/services/services';


const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

const handleSubmit = async () => {
  try {
    const response = await handleLogin({ email, password });
    localStorage.setItem("token", response.token);  // save JWT
    router.push("/profile"); // redirect on success
  } catch (err) {
    setError("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-900 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-900 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
