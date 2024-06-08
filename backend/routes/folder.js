const express = require('express');
const router = express.Router();
const folderController = require('../controller/folderController');
const auth = require('../middleware');

// Create Folder
router.post('/', auth, folderController.createFolder);

// Get Folders
router.get('/:parentId?', auth, folderController.getFolders);

module.exports = router;
