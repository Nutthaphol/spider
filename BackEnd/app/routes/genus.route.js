const genus = require("../controllers/genus.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/genus/allgenus", genus.allGenus);
  app.get("/api/genus/:id", genus.getGenus);
  app.post(
    "/api/genus/postgenus",
    [authJwt.verifyToken, authJwt.isAdmin],
    genus.postGenus
  );
};
