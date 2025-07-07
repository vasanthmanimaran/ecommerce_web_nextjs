// controllers/topseller.controller.js
const topseller = require('../models/topseller');
const fs = require('fs');
const path = require('path');

// CREATE a new topseller card
exports.createtopsellerImage = async (req, res) => {
  try {
    const { title, alt, ratings, price, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newCard = await topseller.create({
      title,
      alt,
      ratings: parseFloat(ratings),
      imageUrl,
      price,
      type,
    });

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL topseller cards
exports.getAlltopseller = async (req, res) => {
  try {
    const cards = await topseller.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE topseller card by ID
exports.gettopsellerById = async (req, res) => {
  try {
    const card = await topseller.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE topseller card by ID
exports.updatetopseller = async (req, res) => {
  try {
    const { title, alt, ratings, price, type } = req.body;
    const card = await topseller.findById(req.params.id);

    if (!card) return res.status(404).json({ message: 'Not Found' });

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../uploads', path.basename(card.imageUrl));
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      card.imageUrl = `/uploads/${req.file.filename}`;
    }

    card.title = title || card.title;
    card.alt = alt || card.alt;
    card.price = price || card.price;
    card.type = type || card.type;
    card.ratings = ratings !== undefined ? parseFloat(ratings) : card.ratings;

    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE topseller card by ID
exports.deletetopseller = async (req, res) => {
  try {
    const card = await topseller.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });

    if (card.imageUrl) {
      const imagePath = path.join(__dirname, '../../uploads', path.basename(card.imageUrl));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await card.deleteOne();
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
