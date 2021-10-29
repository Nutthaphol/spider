const db = require("../models/species.model");
const getAllSpecies = db.getAllSpecies;

exports.allSpecies = (req, res) => {
  getAllSpecies((error, result) => {
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
