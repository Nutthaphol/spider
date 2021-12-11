const location = require("../controllers/location.controller");

module.exports = (app) => {
  app.post("/api/location/postLocation", location.postLocation);
  app.post("/api/location/updateLocation", location.updateLocation);
  app.get("/api/location/:id", location.getLocation);
  app.get("/api/admin/location/:id", location.getLocationAdmin);
  app.get("/api/location", location.getAllLocation);
};
