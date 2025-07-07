const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/middileware');
const { placeOrder, getMyOrders } = require('../controllers/order.controller');

router.post('/', verifyToken, placeOrder);
router.get('/', verifyToken, getMyOrders);

module.exports = router;
