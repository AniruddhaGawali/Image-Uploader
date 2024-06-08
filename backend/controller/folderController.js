const Folder = require('../model/Folder');
const Image = require('../model/Image');

exports.createFolder = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const folder = Folder({
      name,
      user: req.user.id,
      parent: parent || null,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Folders
exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.findById(req.params.id);
    res.json(folders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllFolderData = async (req, res) => {
  try {
    const folders = await Folder.find({
      user: req.user.id,
      parent: req.params.parentId || null,
    }).select('_id name parent createdAt');

    const images = await Image.find({
      user: req.user.id,
      folder: req.params.parentId || null,
    }).select('_id name image folder createdAt');

    res.json([...folders, ...images]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(400).json({ msg: 'Folder ID is required' });

    const folder = await Folder.findByIdAndDelete(req.query.id);
    await Image.deleteMany({ folder });
    await Folder.deleteMany({ parent: req.query.id });

    res.json({ msg: 'Folder removed', folder });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
