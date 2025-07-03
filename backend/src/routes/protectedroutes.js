const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/middileware');

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profile accessed successfully!',
    user: req.user,
  });
});

module.exports = router;
