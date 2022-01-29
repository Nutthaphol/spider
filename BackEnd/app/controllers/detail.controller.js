const db = require("../models/detail.model");

exports.postDetail = async (req, res) => {
  const data = req.body.data;
  await db.postDetail(data, (error, result) => {
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

exports.updateDetailType = async (req, res) => {
  const data = req.body.data;
  await db.updateDetailType(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Update type is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.updateDetail = async (req, res) => {
  const data = req.body.data;
  await db.updateDetail(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Update is fail" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getDetail = async (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  await db.getDetail(id, (error, result) => {
    try {
      if (result) {
        console.log("result", result);
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "detail not found" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getDetailAdmin = async (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  await db.getDetailAdmin(id, (error, result) => {
    try {
      if (result) {
        console.log("result", result);
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "detail not found" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllDetail = async (req, res) => {
  await db.getAllDetail((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "detail not found" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllDetailAdmin = async (req, res) => {
  await db.getAllDetailAdmin((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "detail not found" });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
