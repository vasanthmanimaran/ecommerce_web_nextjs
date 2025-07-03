'use client';

import React, { useState } from 'react';

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', formData, paymentMethod);
    alert('Payment Successful!');
  };

  return (
    <div className="w-full min-h-screen text-white flex p-6 my-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-full rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Checkout</h2>

        {/* Billing Information */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black border border-white p-3 rounded-lg"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <div className="flex gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
              />
              <span>PayPal</span>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="bg-black border border-white p-3 rounded-lg"
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              <input
                className="bg-black border border-white p-3 rounded-lg"
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                value={formData.expiry}
                onChange={handleChange}
                required
              />
              <input
                className="bg-black border border-white p-3 rounded-lg"
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="bg-black border border-white p-4 rounded-lg">
            <div className="flex justify-between">
              <span>Item(s) Total:</span>
              <span>₹2,499.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹100.00</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>₹2,599.00</span>
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
