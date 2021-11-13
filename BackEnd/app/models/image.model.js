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

exports.postImage = postImage;
