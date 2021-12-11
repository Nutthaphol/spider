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

const updateLocation = (data, callback) => {
  const query = `UPDATE location
        SET province = ?,
            district = ?,
            locality = ?,
            active = ?
        WHERE id = ?`;

  const paramt = [
    data.province,
    data.district,
    data.locality,
    data.active,
    data.id,
  ];
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
  const query = `SELECT * FROM location WHERE detail_id = ${id} AND active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get location error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getLocationAdmin = (id, callback) => {
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
  const query = `SELECT * FROM location WHERE active = 1`;

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
exports.getLocationAdmin = getLocationAdmin;
exports.postLocation = postLocation;
exports.getAllLocation = getAllLocation;
exports.updateLocation = updateLocation;
