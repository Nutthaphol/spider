const db = require("../models/detail.model");

exports.postDetail = (req, res) => {
  const data = req.body.data;
  console.log("detail controller", data);
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
