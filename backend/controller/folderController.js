const Folder = require('../model/Folder');

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
    const folders = await Folder.find({
      user: req.user.id,
      parent: req.params.parentId || null,
    });
    res.json(folders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
