const db = require("../models/detail.model");

exports.postDetail = (req, res) => {
  const data = req.body.data;
  db.postDetail(data, (error, result) => {
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

exports.getDetail = (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  db.getDetail(id, (error, result) => {
    try {
      if (result) {
        console.log("result", result);
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "detail not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
