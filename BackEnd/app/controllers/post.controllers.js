const db = require("../models/post.model");
const postFullData = db.postFullData;

exports.FullData = (req, res) => {
  //   console.log(`controllers ${JSON.stringify(req.body)}`);

  postFullData(req.body, (error, result) => {
    try {
      if (result) {
        console.log("controller", result);
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "Failed to post" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
