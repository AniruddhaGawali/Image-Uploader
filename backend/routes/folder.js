const express = require('express');
const router = express.Router();
const folderController = require('../controller/folderController');
const auth = require('../middleware');

// Create Folder
router.post('/', auth, folderController.createFolder);

// Get Folders
router.get('/all/:parentId?', auth, folderController.getAllFolderData);
router.get('/:id?', auth, folderController.getFolders);
router.delete('/', auth, folderController.deleteFolder);

module.exports = router;
