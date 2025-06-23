const cardData = require('../models/card.models');
const fs = require('fs');
const path = require('path');


exports.createcardImage = async (req, res) => {
    try {
        const { title, alt } = req.body;
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        const imageDocs = imageUrls.map(url => ({
            title,
            alt,
            imageUrl: url,
        }));

        const savedImages = await cardData.insertMany(imageDocs);
        res.status(201).json(savedImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
exports.getAllCards = async (req, res) => {
  try {
    const cards = await cardData.find();
    console.log(cards);
    
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
    
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
    const { title, alt } = req.body;
    const card = await cardData.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Not Found' });

    // If new image uploaded, remove old one and set new one
    if (req.file) {
      if (card.imageUrl) {
        const oldPath = path.join(__dirname, '../../uploads', path.basename(card.imageUrl));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      card.imageUrl = `/uploads/${req.file.filename}`;
    }

    card.title = title || card.title;
    card.alt = alt || card.alt;

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