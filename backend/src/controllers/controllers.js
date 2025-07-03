const ImageData = require('../models/models');
const fs = require('fs');
const path = require('path');

// CREATE (single image)
exports.createImage = async (req, res) => {
  try {
    const { title, subtitle, button } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    const imageDoc = {
      title,
      subtitle,
      button,
      imageUrl,
    };

    const savedImage = await ImageData.create(imageDoc); // Using create instead of insertMany for single document
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getallimages = async (req, res) => {
  try {
    const images = await ImageData.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });    
  }
};

// READ ONE
exports.getImageById = async (req, res) => {
  try {
    const image = await ImageData.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Not Found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (with optional new image)
exports.updateImage = async (req, res) => {
  try {
    const { title, subtitle, button } = req.body;
    const image = await ImageData.findById(req.params.id);

    if (!image) return res.status(404).json({ message: 'Not Found' });

    if (req.file) {
      if (image.imageUrl) {
        const filePath = path.join(__dirname, '../../uploads', path.basename(image.imageUrl));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      image.imageUrl = `/uploads/${req.file.filename}`;
    }

    image.title = title || image.title;
    image.subtitle = subtitle || image.subtitle;
    image.button = button || image.button;

    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteImage = async (req, res) => {
  try {
    const image = await ImageData.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Not Found' });

    if (image.imageUrl) {
      const filePath = path.join(__dirname, '../../uploads', path.basename(image.imageUrl));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await image.deleteOne();
    res.json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};