const connection = require("./database.model");

const getAllSpider = (callback) => {
  const query = `SELECT * FROM spider_list`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    console.log(`Result spider: ${result}`);
    callback(null, result);
  });
};

exports.getAllSpider = getAllSpider;
