const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const postcardimg = require('../controllers/card.controllers');
const upload = require('../multer/multer');



//banner routes
router.post('/postbanner', upload.array('images' , 2), controller.createImage);
router.get('/getbanner', controller.getAllImages);
router.get('/getbannerbyid/:id', controller.getImageById);
router.put('/putbanner/:id', upload.single('image'), controller.updateImage);
router.delete('/:id', controller.deleteImage);


//card routes
router.post('/postcard', upload.array('images', 2),postcardimg.createcardImage);
router.get('/getcard', postcardimg.getAllCards);
router.get('/getcardbyid/:id', postcardimg.getCardById);
router.put('/putcard/:id', upload.single('image'), postcardimg.updateCard);
router.delete('/deletecard/:id', postcardimg.deleteCard);

//top seller routes


module.exports = router;
