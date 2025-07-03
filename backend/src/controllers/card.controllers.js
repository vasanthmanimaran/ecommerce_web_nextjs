const cardData = require('../models/card.models');
const fs = require('fs');
const path = require('path');

exports.createcardImage = async (req, res) => {
  try {
    const { title, alt, ratings,price } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    const imageDoc = {
      title,
      alt,
      ratings: parseFloat(ratings),
      imageUrl,
      price,
    };

    const savedImage = await cardData.create(imageDoc); // Using create instead of insertMany for single document
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getAllCards = async (req, res) => {
  try {
    const cards = await cardData.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE by ID
exports.getCardById = async (req, res) => {
  try {
    const card = await cardData.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE by ID
exports.updateCard = async (req, res) => {
  try {
    const { title, alt, ratings ,price } = req.body;
    const card = await cardData.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });

    if (req.file) {
      if (card.imageUrl) {
        const oldPath = path.join(__dirname, '../../uploads', path.basename(card.imageUrl));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      card.imageUrl = `/uploads/${req.file.filename}`;
    }

    card.title = title || card.title;
    card.alt = alt || card.alt;
    card.price = price || card.price;
    card.ratings = ratings !== undefined ? parseFloat(ratings) : card.ratings;

    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE by ID
exports.deleteCard = async (req, res) => {
  try {
    const card = await cardData.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });

    if (card.imageUrl) {
      const filePath = path.join(__dirname, '../../uploads', path.basename(card.imageUrl));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await card.deleteOne();
    res.json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};