const connection = require("./database.model");

const postAddress = (data, callback) => {
  const query = `INSERT INTO address (
    location_id,
    name,
    latitude,
    longitude
) VALUES (?,?,?,?)`;

  const paramt = [data.location_id, data.name, data.lat, data.long];

  connection.query(query, paramt, (error, result) => {
    if (error) {
      console.log("error addrass   ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};

exports.postAddress = postAddress;
