const db = require("../models/family.model");
const getAllFamily = db.getAllFamily;

exports.allFamily = (req, res) => {
  getAllFamily((error, result) => {
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
