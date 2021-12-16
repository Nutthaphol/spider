const location = require("../controllers/location.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.post(
    "/api/location/postLocation",
    [authJwt.verifyToken, authJwt.isAdmin],
    location.postLocation
  );
  app.post(
    "/api/location/updateLocation",
    [authJwt.verifyToken, authJwt.isAdmin],
    location.updateLocation
  );
  app.get("/api/location/:id", location.getLocation);
  app.get(
    "/api/admin/location/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    location.getLocationAdmin
  );
  app.get("/api/location", location.getAllLocation);
};
