const db = require("../models/district.model");

exports.getAllDistrict = async (req, res) => {
  await db.getAllDistricts((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(error);
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
