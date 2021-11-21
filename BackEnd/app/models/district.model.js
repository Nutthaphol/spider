const connection = require("./database.model");

const getAllDistricts = (callback) => {
  const query = `SELECT id, name_en, province_id FROM districts_list`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("all districts error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};
exports.getAllDistricts = getAllDistricts;
