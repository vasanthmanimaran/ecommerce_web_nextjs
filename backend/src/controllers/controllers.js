const ImageData = require('../models/models');
const fs = require('fs');
const path = require('path');

// CREATE (multiple images allowed)
exports.createImage = async (req, res) => {
  try {
    const { title, subtitle, button } = req.body;
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const imageDocs = imageUrls.map(url => ({
      title,
      subtitle,
      button,
      imageUrl: url,
    }));

    const savedImages = await ImageData.insertMany(imageDocs);
    res.status(201).json(savedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getAllImages = async (req, res) => {
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
    const { title, subtitle, button} = req.body;
    const image = await ImageData.findById(req.params.id);

    if (!image) return res.status(404).json({ message: 'Not Found' });

    if (req.file) {
      // Remove old image file from disk
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
