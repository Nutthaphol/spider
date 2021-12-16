const addrass = require("../controllers/address.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.post(
    "/api/address/postAddress",
    [authJwt.verifyToken, authJwt.isAdmin],
    addrass.postAddress
  );
  app.post(
    "/api/address/updateAddress",
    [authJwt.verifyToken, authJwt.isAdmin],
    addrass.updateAddress
  );
  app.get("/api/address/:id", addrass.getAddress);
  app.get(
    "/api/admin/address/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    addrass.getAddressAdmin
  );
  app.get("/api/address", addrass.getAllAddress);
  app.get("/api/address/getFromLocationId/:id", addrass.getFromLocation);
};
