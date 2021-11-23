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
        designate
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
