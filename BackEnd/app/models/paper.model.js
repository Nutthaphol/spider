const connection = require("./database.model");

const postPaper = (data, callback) => {
  const query = `INSERT INTO paper (
        detail_id,
        name,
        active
  ) VALUES (?, ?, ?)`;

  const paramt = [data.detail_id, data.name, true];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error paper   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const updatePaper = (data, callback) => {
  const query = `UPDATE paper
        SET name = ?,
            active = ?
        WHERE id = ?`;

  const paramt = [data.name, data.active, data.id];
  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getPaper = (id, callback) => {
  const query = `SELECT * FROM paper WHERE detail_id = ${id} AND active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("paper error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getPaperAdmin = (id, callback) => {
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
exports.updatePaper = updatePaper;
exports.getPaper = getPaper;
exports.getPaperAdmin = getPaperAdmin;
