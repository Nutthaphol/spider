const location = require("../controllers/location.controller");

module.exports = (app) => {
  app.post("/api/location/postlocation", location.postLocation);
  app.get("/api/location/:id", location.getLocation);
};
