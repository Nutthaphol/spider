const db = require("../models/address.model");

exports.postAddress = (req, res) => {
  const data = req.body.data;

  db.postAddress(data, (error, result) => {
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
