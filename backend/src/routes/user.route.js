const express = require('express');
const router = express.Router();
const auth = require('../middleware/protectedroute');
const User = require('../models/usermodel');
const Product = require('../models/card.models');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const relatedProducts = await Product.find({
      type: user.favoriteCategory || 'all',
    }).limit(4);

    res.json({ user, relatedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
