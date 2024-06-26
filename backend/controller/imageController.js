const Image = require('../model/Image');

exports.createImage = async (req, res) => {
  let { name, folder, image } = req.body;

  try {
    const NewImage = Image({
      name,
      image,
      folder: folder ? folder : null,
      user: req.user.id,
    });

    await NewImage.save();

    res.status(201).json(NewImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({
      user: req.user.id,
      folder: req.params.folderId ? req.params.folderId : null,
    }).select('_id name image folder createdAt');
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteImage = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(400).json({ msg: 'Image ID is required' });
    const image = await Image.findByIdAndDelete(req.query.id);

    res.json({ msg: 'Image removed', image });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
