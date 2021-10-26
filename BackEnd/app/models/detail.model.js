const connection = require("./database.model");

const getAllDetail = (callback) => {
  const query = `SELECT * FROM detail_record`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }
    console.log(`Result detail: ${result}`);
    callback(null, result);
  });
};

exports.getAllDetail = getAllDetail;
