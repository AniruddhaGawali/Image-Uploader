const express = require('express');
const router = express.Router();

const imageController = require('../controller/imageController');
const auth = require('../middleware');

router.post('/upload', auth, imageController.createImage);
router.get('/:folderId?', auth, imageController.getImages);
router.delete('/', auth, imageController.deleteImage);

module.exports = router;
