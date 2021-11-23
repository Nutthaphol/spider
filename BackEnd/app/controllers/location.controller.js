const db = require("../models/location.model");

exports.postLocation = (req, res) => {
  const data = req.body.data;

  db.postLocation(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Insert is fail" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getLocation = (req, res) => {
  const id = req.params.id;

  db.getLocation(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "location not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllLocation = (req, res) => {
  db.getAllLocation((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "location not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
