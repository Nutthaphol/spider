const db = require("../models/detail.model");

exports.postDetail = (req, res) => {
  const data = req.body.data;
  db.postDetail(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Insert is fail" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.updateDetailType = (req, res) => {
  const data = req.body.data;
  db.updateDetailType(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Update type is fail" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.updateDetail = (req, res) => {
  const data = req.body.data;
  db.updateDetail(data, (error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Update is fail" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getDetail = (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  db.getDetail(id, (error, result) => {
    try {
      if (result) {
        console.log("result", result);
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "detail not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getDetailAdmin = (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  db.getDetailAdmin(id, (error, result) => {
    try {
      if (result) {
        console.log("result", result);
        res.status(200).send(result[0]);
      } else {
        res.status(404).send({ message: "detail not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllDetail = (req, res) => {
  db.getAllDetail((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "detail not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};

exports.getAllDetailAdmin = (req, res) => {
  db.getAllDetailAdmin((error, result) => {
    try {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "detail not fount" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
