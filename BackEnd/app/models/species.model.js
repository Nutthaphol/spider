const connection = require("./database.model");

const getAllSpecies = (callback) => {
  const query = `SELECT * FROM species`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    // console.log(`get all species ready.`);
    callback(null, result);
  });
};

const postSpecies = (data, callback) => {
  const query = `INSERT INTO species (genus_id, name) VALUES (?, ?);`;

  const paramt = [data.genus_id, data.name];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error model species", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.getAllSpecies = getAllSpecies;
exports.postSpecies = postSpecies;
