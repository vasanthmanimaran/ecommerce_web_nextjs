'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getcardbyid } from '@/app/home/services/services';
import Image from 'next/image';

const Payment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const data = await getcardbyid(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    console.log('Order placed:', formData, paymentMethod, product);
  };

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-500">Product not found.</div>;

  const shippingCost = 100;
  const total = product.price + shippingCost;

  if (orderPlaced) {
    return (
      <div className="text-white flex flex-col items-center justify-center h-screen bg-black px-4">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-lg mb-4">Your payment was successful.</p>
        <p className="text-md text-gray-400">We will send the receipt to: <strong>{formData.email}</strong></p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white flex justify-center py-10 my-10 px-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-full rounded-2xl shadow-xl p-8 space-y-8 border border-white"
      >
        <h2 className="text-3xl font-bold text-center">Order Checkout</h2>

        {/* Product Preview */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-1/3 h-64 border border-white rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-400">{product.alt}</p>
            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-xl ${i + 1 <= product.ratings ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
              ))}
              <span className="text-sm text-gray-400">({product.ratings.toFixed(1)})</span>
            </div>
            <p className="text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Billing Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['name', 'email', 'address', 'city', 'zip', 'country'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
                className="bg-black border border-white p-3 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <div className="flex gap-6 mb-4">
            {['card', 'paypal'].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['cardNumber', 'expiry', 'cvv'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={
                    field === 'cardNumber'
                      ? 'Card Number'
                      : field === 'expiry'
                      ? 'Expiry (MM/YY)'
                      : 'CVV'
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white p-3 rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="bg-black border border-white p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Item Price:</span>
              <span>₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shippingCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-white text-black p-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Payment;
