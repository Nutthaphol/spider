const genus = require("../controllers/genus.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/genus/allgenus", genus.allGenus);
  app.get("/api/genus/:id", genus.getGenus);
  app.post(
    "/api/genus/postgenus",
    [authJwt.verifyToken, authJwt.isAdmin],
    genus.postGenus
  );
};
