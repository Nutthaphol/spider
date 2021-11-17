const family = require("../controllers/family.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/family/allfamily", family.allFamily);
  app.get("/api/family/:id", family.getFamily);
  app.post("/api/family/postfamily", family.postFamily);
};
