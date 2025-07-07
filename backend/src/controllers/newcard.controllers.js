const Cart = require('../models/card.models');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart || { userId: req.user.id, items: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.id, items: [{ productId, quantity }] });
  } else {
    const index = cart.items.findIndex(i => i.productId.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
};
