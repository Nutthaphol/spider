const family = require("../controllers/family.controllers");

module.exports = (app) => {
  app.get("/api/family/allfamily", family.allFamily);
};
