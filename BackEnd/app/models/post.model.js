const connection = require("./database.model");

const postFullData = (data, callback) => {
  console.log("model", data);
  callback(null, data);
};

exports.postFullData = postFullData;
