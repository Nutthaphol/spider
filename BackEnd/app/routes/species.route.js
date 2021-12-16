const species = require("../controllers/species.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.get("/api/species/allspecies", species.allSpecies);
  app.get("/api/species/:id", species.getSpecies);
  app.post(
    "/api/species/postspecies",
    [authJwt.verifyToken, authJwt.isAdmin],
    species.postSpecies
  );
};
