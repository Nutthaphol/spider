const connection = require("./database.model");

const getAllGenus = (callback) => {
  const query = `SELECT * FROM genus`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    // console.log(`get all genus ready.`);
    callback(null, result);
  });
};

exports.getAllGenus = getAllGenus;
