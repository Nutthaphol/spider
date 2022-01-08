const db = require("../models/location.model");

exports.postLocation = async (req, res) => {
  const data = req.body.data;

  await db.postLocation(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Insert is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.updateLocation = async (req, res) => {
  const data = req.body.data;

  await db.updateLocation(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Update is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getLocation = async (req, res) => {
  const id = req.params.id;

  await db.getLocation(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "location not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getLocationAdmin = async (req, res) => {
  const id = req.params.id;

  await db.getLocationAdmin(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "location not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllLocation = async (req, res) => {
  await db.getAllLocation((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "location not fount" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
