const province = require("../controllers/province.controller");

module.exports = (app) => {
  app.get("/api/getallprovinces", province.getAllProvince);
};
