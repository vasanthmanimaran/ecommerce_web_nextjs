const Order = require('../models/orders');

exports.placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = await Order.create({
    userId: req.user.id,
    items,
    totalAmount
  });
  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
  res.json(orders);
};
