const db_t1 = require("../models/family.model");
const db_t2 = require("../models/genus.model");
const db_t3 = require("../models/species.model");

exports.FullData = (req, res) => {
  //  extract data from files
  const data = JSON.parse(req.body.data);
  const files = req.files;
  let image = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const { filename, path } = files[i];
      image.push({ filename, path });
    }
  }

  res.send(data);

  if (!Number(data.family)) {
  }
};
