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

const postGenus = (data, callback) => {
  const query = `INSERT INTO genus (family_id, name) VALUES (?, ?);`;

  const paramt = [data.family_id, data.name];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getGenus = (id, callback) => {
  const query = `SELECT * FROM genus WHERE id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get genus error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.getGenus = getGenus;
exports.postGenus = postGenus;
exports.getAllGenus = getAllGenus;
