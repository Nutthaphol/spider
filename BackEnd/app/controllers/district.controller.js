const db = require("../models/district.model");

exports.getAllDistrict = (req, res) => {
  db.getAllDistricts((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(error);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
