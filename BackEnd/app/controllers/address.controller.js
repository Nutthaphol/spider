const db = require("../models/address.model");

exports.postAddress = async (req, res) => {
  const data = req.body.data;

  await db.postAddress(data, (error, result) => {
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

exports.updateAddress = async (req, res) => {
  const data = req.body.data;

  await db.updateAddress(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Update address is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAddress = async (req, res) => {
  const id = req.params.id;

  await db.getAddress(id, (error, result) => {
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

exports.getAddressAdmin = async (req, res) => {
  const id = req.params.id;

  await db.getAddressAdmin(id, (error, result) => {
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

exports.getAllAddress = async (req, res) => {
  await db.getAllAddress((error, result) => {
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

exports.getFromLocation = async (req, res) => {
  const location_id = req.params.id;
  await db.getFromLocation(location_id, (error, result) => {
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
