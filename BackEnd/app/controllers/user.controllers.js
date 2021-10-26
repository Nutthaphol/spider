const db = require("../models/user.model");
const getAllUser = db.getAllUser;

exports.allUser = (req, res) => {
  getAllUser((error, result) => {
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
