const connection = require("./database.model");

const getAllSpecies = (callback) => {
  const query = `SELECT * FROM species`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    console.log(`get all species ready.`);
    callback(null, result);
  });
};

exports.getAllSpecies = getAllSpecies;
