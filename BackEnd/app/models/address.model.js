const connection = require("./database.model");

const postAddress = (data, callback) => {
  const query = `INSERT INTO address (
    location_id,
    name,
    latitude,
    longitude,
    active
) VALUES (?,?,?,?,?)`;

  const paramt = [
    data.location_id,
    data.name,
    data.latitude,
    data.longitude,
    true,
  ];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error addrass   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const updateAddress = (data, callback) => {
  const query = `UPDATE address
  SET name = ?,
      latitude = ?,
      longitude = ?,
      active = ?
  WHERE id = ?`;

  const paramt = [
    data.name,
    data.latitude,
    data.longitude,
    data.active,
    data.id,
  ];

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
  const query = `SELECT * FROM address WHERE location_id = ${id} AND active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get address error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAddressAdmin = (id, callback) => {
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

const getFromLocation = (location_id, callback) => {
  const query = `SELECT * FROM address WHERE location_id = ${location_id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("get address from location_id error", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postAddress = postAddress;
exports.getAddress = getAddress;
exports.getAddressAdmin = getAddressAdmin;
exports.getAllAddress = getAllAddress;
exports.getFromLocation = getFromLocation;
exports.updateAddress = updateAddress;
