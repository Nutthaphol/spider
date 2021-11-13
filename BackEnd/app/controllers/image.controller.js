const db = require("../models/image.model");

exports.postImage = (req, res) => {
  const { filename, path } = req.file;
  const detail_id = req.body.detail_id;

  const data = {
    detail_id: detail_id,
    name: filename,
    path: path,
  };

  db.postImage(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Insert data is fail." });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  console.log(filename, path, detail_id);
};
