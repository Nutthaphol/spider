const species = require("../controllers/species.controllers");

module.exports = (app) => {
  app.get("/api/species/allspecies", species.allSpecies);
};
