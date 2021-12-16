const province = require("../controllers/province.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/getallprovinces", province.getAllProvince);
};
