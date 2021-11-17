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

const postFamily = (name, callback) => {
  const query = `INSERT INTO family (name) VALUES (?);`;

  const paramt = [name];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    // console.log(`after post ${result.insertId}`);
    callback(null, result);
  });
};

const getFamily = (id, callback) => {
  const query = `SELECT * FROM family where id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get family error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.getAllFamily = getAllFamily;
exports.getFamily = getFamily;
exports.postFamily = postFamily;
