const district = require("../controllers/district.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/getalldistricts", district.getAllDistrict);
};
