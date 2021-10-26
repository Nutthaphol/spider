const connection = require("./database.model");

const getAllUser = (callback) => {
  const query = `SELECT * FROM auth`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    console.log(`Result user: ${result}`);
    callback(null, result);
  });
};

exports.getAllUser = getAllUser;
