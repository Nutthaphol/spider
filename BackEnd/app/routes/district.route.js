const district = require("../controllers/district.controller");

module.exports = (app) => {
  app.get("/api/getalldistricts", district.getAllDistrict);
};
