const express = require('express');
const router = express.Router();
const upload = require('../multer/multer');

const {
  createImage,
  getImageById,
  updateImage,
  deleteImage,
  getallimages
} = require('../controllers/controllers');

const {
  createcardImage,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard
} = require('../controllers/card.controllers');

// Banner routes
router.post('/postbanner', upload.single('images'), createImage); // Changed to single file
router.get('/getbanner', getallimages);
router.get('/getbannerbyid/:id', getImageById);
router.put('/putbanner/:id', upload.single('image'), updateImage);
router.delete('/deletebanner/:id', deleteImage); // Updated to /deletebanner/:id

// Card routes
router.post('/postcard', upload.single('images'), createcardImage); // Changed to single file
router.get('/getcard', getAllCards);
router.get('/getcardbyid/:id', getCardById);
router.put('/putcard/:id', upload.single('image'), updateCard);
router.delete('/deletecard/:id', deleteCard);

// Export router
module.exports = router;