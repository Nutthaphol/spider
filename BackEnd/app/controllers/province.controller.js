const db = require("../models/province.model");

exports.getAllProvince = async (req, res) => {
  await db.getAllProvinces((error, result) => {
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
