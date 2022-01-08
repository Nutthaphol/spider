const addrass = require("../controllers/address.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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
