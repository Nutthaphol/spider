const species = require("../controllers/species.controller");

module.exports = (app) => {
  app.get("/api/species/allspecies", species.allSpecies);
  app.get("/api/species/:id", species.getSpecies);
  app.post("/api/species/postspecies", species.postSpecies);
};
