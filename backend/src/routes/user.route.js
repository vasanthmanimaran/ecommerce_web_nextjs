const express = require('express');
const router = express.Router();
const auth = require('../middleware/middileware');

const User = require('../models/usermodel');
const Product = require('../models/card.models');
const Order = require('../models/orders');
const Wishlist = require('../models/whishlist.models');
const Address = require('../models/address.models');

const bcrypt = require('bcryptjs');

// ✅ GET: Full User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const relatedProducts = await Product.find({
      type: user.favoriteCategory || 'all',
    }).limit(4);

    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
    const wishlist = await Wishlist.find({ userId: user._id }).populate('productId');
    const addresses = await Address.find({ userId: user._id });

    res.json({
      user,
      relatedProducts,
      orders,
      wishlist: wishlist.map(item => item.productId),
      addresses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✏️ PUT: Update Profile Info
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, favoriteCategory } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, favoriteCategory },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
});

// 🔐 PUT: Change Password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password change failed', error: err.message });
  }
});


// ➕ POST: Add Address
router.post('/address', auth, async (req, res) => {
  try {
    const newAddress = new Address({ ...req.body, userId: req.user.id });
    await newAddress.save();
    res.status(201).json({ message: 'Address added', address: newAddress });
  } catch (err) {
    res.status(500).json({ message: 'Add address failed', error: err.message });
  }
});

// 🛠️ PUT: Update Address
router.put('/address/:id', auth, async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json({ message: 'Address updated', address: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update address failed', error: err.message });
  }
});

// ❌ DELETE: Remove Address
router.delete('/address/:id', auth, async (req, res) => {
  try {
    await Address.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete address failed', error: err.message });
  }
});

module.exports = router;
