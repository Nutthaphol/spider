const db = require("../models/genus.model");
const getAllGenus = db.getAllGenus;
const postGenus = db.postGenus;

exports.allGenus = (req, res) => {
  getAllGenus((error, result) => {
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

exports.postGenus = (req, res) => {
  const data = req.body;
  console.log(data);
  // postGenus(data, (error, result) => {
  //   try {
  //     if (result) {
  //       res.status(200).send(result);
  //     } else {
  //       return res.status(404).send({ message: "Data not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ message: error.message });
  //   }
  // });
};
