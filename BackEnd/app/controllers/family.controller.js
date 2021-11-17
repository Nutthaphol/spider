const db = require("../models/family.model");

exports.allFamily = (req, res) => {
  db.getAllFamily((error, result) => {
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

exports.postFamily = (req, res) => {
  const name = req.body.data;
  db.postFamily(name, (error, result) => {
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

exports.getFamily = (req, res) => {
  const id = req.params.id;
  db.getFamily(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "family not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
