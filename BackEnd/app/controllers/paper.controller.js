const db = require("../models/paper.model");

exports.postPaper = (req, res) => {
  const data = req.body.data;

  db.postPaper(data, (error, result) => {
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

exports.getPaper = (req, res) => {
  const id = req.params.id;

  db.getPaper(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "paper not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
