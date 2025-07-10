const express = require('express');
const router = express.Router();
const upload = require('../multer/multer');

router.use(require('./authroutes'));
router.use('/middleware', require('../middleware/middileware'));


router.use('/cart', require('./cart.route'));
router.use('/orders', require('./order.route'));
router.use('/user', require('./user.route'));


// Banner Routes
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

// Card Routes
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

// Topseller Routes
const {
  createtopsellerImage,
  getAlltopseller,
  gettopsellerById,
  updatetopseller,
  deletetopseller,
} = require('../controllers/topseller');

router.post('/posttopseller', upload.single('image'), createtopsellerImage);
router.get('/gettopseller', getAlltopseller);
router.get('/gettopsellerbyid/:id', gettopsellerById);
router.put('/puttopseller/:id', upload.single('image'), updatetopseller);
router.delete('/deletetopseller/:id', deletetopseller);

module.exports = router;
