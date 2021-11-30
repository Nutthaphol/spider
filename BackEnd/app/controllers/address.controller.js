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

exports.getAddress = (req, res) => {
  const id = req.params.id;

  db.getAddress(id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "address not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllAddress = (req, res) => {
  db.getAllAddress((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "address not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getFromLocation = (req, res) => {
  const location_id = req.params.id;
  db.getFromLocation(location_id, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send({ message: `address from id ${location_id} not fount` });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
