const connection = require("./database.model");

const postAddress = (data, callback) => {
  const query = `INSERT INTO address (
    location_id,
    name,
    latitude,
    longitude
) VALUES (?,?,?,?)`;

  const paramt = [data.location_id, data.name, data.latitude, data.longitude];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error addrass   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAddress = (id, callback) => {
  const query = `SELECT * FROM address WHERE location_id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get address error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAllAddress = (callback) => {
  const query = `SELECT * FROM address`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get address error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postAddress = postAddress;
exports.getAddress = getAddress;
exports.getAllAddress = getAllAddress;
