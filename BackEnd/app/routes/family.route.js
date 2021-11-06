const family = require("../controllers/family.controllers");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/family/allfamily", family.allFamily);
  app.post("/api/family/postfamily", family.postFamily);
};
