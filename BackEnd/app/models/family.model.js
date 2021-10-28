const connection = require("./database.model");

const getAllFamily = (callback) => {
  const query = `SELECT * FROM family`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    // console.log(`get all family ready.`);
    callback(null, result);
  });
};

exports.getAllFamily = getAllFamily;
