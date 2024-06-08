const express = require('express');
const router = express.Router();

const imageController = require('../controller/imageController');
const auth = require('../middleware');


router.get('/:id?',auth, imageController.getImages);
router.post('/upload', auth,imageController.createImage);

module.exports = router;