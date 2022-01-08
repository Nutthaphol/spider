const db = require("../models/image.model");

exports.postImage = async (req, res) => {
  const { filename, path } = req.file;
  const detail_id = req.body.detail_id;

  const data = {
    detail_id: detail_id,
    name: filename,
    path: path,
  };

  await db.postImage(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Insert data is fail." });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });

  console.log(filename, path, detail_id);
};

exports.updateImage = async (req, res) => {
  const data = req.body.data;

  await db.updateImage(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Insert data is fail." });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getImage = async (req, res) => {
  const id = req.params.id;

  await db.getImage(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "image not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getImageAdmin = async (req, res) => {
  const id = req.params.id;

  await db.getImageAdmin(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "image not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
