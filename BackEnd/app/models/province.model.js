const connection = require("./database.model");

const getAllProvinces = (callback) => {
  const query = `SELECT * FROM provinces_list`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("all provinces error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.getAllProvinces = getAllProvinces;
