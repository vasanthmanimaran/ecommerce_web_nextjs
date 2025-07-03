const express = require('express');
const router = express.Router();
const upload = require('../multer/multer');

router.use(require('./authRoutes'));

// Protected Routes
router.use('/protected', require('./protectedRoutes'));

const {
  createImage,
  getImageById,
  updateImage,
  deleteImage,
  getallimages,
} = require('../controllers/controllers');

router.post('/postbanner', upload.single('image'), createImage);
router.get('/getbanner', getallimages);
router.get('/getbannerbyid/:id', getImageById);
router.put('/putbanner/:id', upload.single('image'), updateImage);
router.delete('/deletebanner/:id', deleteImage);


const {
  createcardImage,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
} = require('../controllers/card.controllers');

router.post('/postcard', upload.single('image'), createcardImage);
router.get('/getcard', getAllCards);
router.get('/getcardbyid/:id', getCardById);
router.put('/putcard/:id', upload.single('image'), updateCard);
router.delete('/deletecard/:id', deleteCard);

module.exports = router;
