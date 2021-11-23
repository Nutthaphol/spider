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

const getLocation = (id, callback) => {
  const query = `SELECT * FROM location WHERE detail_id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get location error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAllLocation = (callback) => {
  const query = `SELECT * FROM location`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get location error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.getLocation = getLocation;
exports.postLocation = postLocation;
exports.getAllLocation = getAllLocation;
