const connection = require("./database.model");

const getAllUser = (callback) => {
  const query = `SELECT * FROM user`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    console.log(`get all auth ready.`);
    callback(null, result);
  });
};

exports.getAllUser = getAllUser;
