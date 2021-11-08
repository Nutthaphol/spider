const db = require("../models/post.model");
const postFullData = db.postFullData;

exports.FullData = (req, res) => {
  const data = JSON.parse(req.body.data);

  const files = req.files;

  //  extract data from files
  let image = [];
  for (let i = 0; i < files.length; i++) {
    const { filename, path } = files[i];
    image.push({ filename, path });
  }

  // postFullData(req.body, (error, result) => {
  //     try {
  //       if (result) {
  //         // console.log("controller", result);
  //         return res.status(200).send(result);
  //       } else {
  //         return res.status(404).send({ message: "Failed to post" });
  //       }
  //     } catch (error) {
  //       res.status(500).send({ message: error.message });
  //     }
  // });
};
