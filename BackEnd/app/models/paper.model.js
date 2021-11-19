const connection = require("./database.model");

const postPaper = (data, callback) => {
  const query = `INSERT INTO paper (
        detail_id,
        name
  ) VALUES (?, ?)`;

  const paramt = [data.detail_id, data.name];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error paper   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getPaper = (id, callback) => {
  const query = `SELECT * FROM paper WHERE detail_id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("paper error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postPaper = postPaper;
exports.getPaper = getPaper;
