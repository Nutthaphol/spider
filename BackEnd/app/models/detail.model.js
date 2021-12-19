const connection = require("./database.model");

const postDetail = (data, callback) => {
  const query = `INSERT INTO detail (
        family_id,
        genus_id,
        species_id,
        author,
        publish_year,
        country,
        country_other,
        altitude,
        method,
        habitat,
        microhabitat,
        designate,
        active
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const paramt = [
    data.family_id,
    data.genus_id,
    data.species_id,
    data.author,
    data.publish_year,
    data.country,
    data.country_other,
    data.altitude,
    data.method,
    data.habitat,
    data.microhabitat,
    data.designate,
    true,
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

const updateDetailType = (data, callback) => {
  const query = `UPDATE detail 
  SET family_id = ?,
      genus_id = ?,
      species_id = ?
  WHERE id = ?
  `;

  const paramt = [data.family_id, data.genus_id, data.species_id, data.id];
  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log(error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const updateDetail = (data, callback) => {
  const query = `UPDATE detail 
  SET author = ?,
  publish_year = ?,
  country = ?,
  country_other = ?,
  altitude = ?,
  method = ?,
  habitat = ?,
  microhabitat = ?,
  designate = ?,
  active = ?
  WHERE id = ?
  `;

  const paramt = [
    data.author,
    data.publish_year,
    data.country,
    data.country_other,
    data.altitude,
    data.method,
    data.habitat,
    data.microhabitat,
    data.designate,
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

const getDetail = (id, callback) => {
  const query = `SELECT * from detail where id = ${id} AND active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("error get detail id", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getDetailAdmin = (id, callback) => {
  const query = `SELECT * from detail where id = ${id}`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("error get detail id", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAllDetail = (callback) => {
  const query = `SELECT * from detail where active = 1`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("error get detail id", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

const getAllDetailAdmin = (callback) => {
  const query = `SELECT * from detail`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log("error get detail id", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postDetail = postDetail;
exports.getDetail = getDetail;
exports.getAllDetail = getAllDetail;
exports.getDetailAdmin = getDetailAdmin;
exports.getAllDetailAdmin = getAllDetailAdmin;
exports.updateDetail = updateDetail;
exports.updateDetailType = updateDetailType;
