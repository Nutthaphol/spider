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
        habtat,
        microhabtat,
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
    data.habtat,
    data.microhabtat,
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

exports.postDetail = postDetail;