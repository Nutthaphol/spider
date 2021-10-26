const connection = require("./database.model");

const getAllPosition = (callback) => {
  const query = `SELECT * FROM position_`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    console.log(`Result position: ${result}`);
    callback(null, result);
  });
};

exports.getAllPosition = getAllPosition;
