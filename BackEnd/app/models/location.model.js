const connection = require("./database.model");

const postLocation = (data, callback) => {
  const query = `INSERT INTO location (
        detail_id,
        province,
        district,
        locality
  ) VALUES (?, ?, ?, ?)`;

  const paramt = [data.detail_id, data.province, data.district, data.locality];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postLocation = postLocation;
