const Image = require('../model/Image');

exports.createImage = async (req, res) => {
  const { name, folder, image } = req.body;

  try {
    const NewImage = Image({
      name,
      image,
      folder,
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
    console.log(req.user.id, req.params.id);
    console.log(req);
    const images = await Image.find({
      user: req.user.id,
      folder: req.params.id,
    });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
