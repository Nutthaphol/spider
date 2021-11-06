const genus = require("../controllers/genus.controllers");

module.exports = (app) => {
  app.get("/api/genus/allgenus", genus.allGenus);
  app.post("/api/genus/postgenus", genus.postGenus);
};
