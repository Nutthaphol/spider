const db = require("../models/family.model");

exports.allFamily = async (req, res) => {
  await db.getAllFamily((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Data not found" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.postFamily = async (req, res) => {
  const name = req.body.data;
  await db.postFamily(name, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Insert is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getFamily = async (req, res) => {
  const id = req.params.id;
  await db.getFamily(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "family not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
