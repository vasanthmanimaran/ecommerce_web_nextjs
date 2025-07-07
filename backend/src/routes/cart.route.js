const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/middileware');
const { getCart, addToCart, removeFromCart } = require('../controllers/newcard.controllers');

router.get('/', verifyToken, getCart);
router.post('/add', verifyToken, addToCart);
router.delete('/remove/:productId', verifyToken, removeFromCart);

module.exports = router;
