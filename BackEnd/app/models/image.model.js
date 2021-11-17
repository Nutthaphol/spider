const connection = require("./database.model");

const postImage = (data, callback) => {
  const query = `INSERT INTO image (
        detail_id,
        name,
        path
  ) VALUES (?, ?, ?)`;

  const paramt = [data.detail_id, data.name, data.path];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error image   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getFromDetail = (id, callback) => {
  const query = `SELECT * FROM image WHERE detail_id = id`;

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
exports.getFromDetail = getFromDetail;
