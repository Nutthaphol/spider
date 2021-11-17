const db = require("../models/species.model");

exports.allSpecies = (req, res) => {
  db.getAllSpecies((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Data not found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.postSpecies = (req, res) => {
  const data = req.body;

  db.postSpecies(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Insert is fail" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
exports.getSpecies = (req, res) => {
  const id = req.params.id;

  db.getSpecies(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "species not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
