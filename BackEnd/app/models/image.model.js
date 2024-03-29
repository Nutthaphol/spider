const connection = require("./database.model");
const { unlink } = require("fs");

const postImage = (data, callback) => {
  const query = `INSERT INTO image (
        detail_id,
        name,
        path,
        active
  ) VALUES (?, ?, ?, ?)`;

  const paramt = [data.detail_id, data.name, data.path, true];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error image   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};
const updateImage = (data, callback) => {
  let query;
  let paramt;
  if (data.active == 1) {
    query = `UPDATE image
    set active = ?
    WHERE id = ?`;
    paramt = [data.active, data.id];
  } else if (data.active == 0) {
    query = `DELETE FROM image
          WHERE id = ?`;
    paramt = [data.id];

    unlink("./app/image/" + data.name, (err) => {
      if (err) throw err;
    });
  }

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error image   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getImage = (id, callback) => {
  const query = `SELECT * FROM image WHERE detail_id = ${id} AND active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get img from detail error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getImageAdmin = (id, callback) => {
  const query = `SELECT * FROM image WHERE detail_id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get img from detail error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postImage = postImage;
exports.getImage = getImage;
exports.getImageAdmin = getImageAdmin;
exports.updateImage = updateImage;
