const species = require("../controllers/species.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/species/allspecies", species.allSpecies);
  app.get("/api/species/:id", species.getSpecies);
  app.post(
    "/api/species/postspecies",
    [authJwt.verifyToken, authJwt.isAdmin],
    species.postSpecies
  );
};
