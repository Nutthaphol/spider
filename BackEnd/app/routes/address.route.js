const addrass = require("../controllers/address.controller");

module.exports = (app) => {
  app.post("/api/address/postAddress", addrass.postAddress);
  app.post("/api/address/updateAddress", addrass.updateAddress);
  app.get("/api/address/:id", addrass.getAddress);
  app.get("/api/admin/address/:id", addrass.getAddressAdmin);
  app.get("/api/address", addrass.getAllAddress);
  app.get("/api/address/getFromLocationId/:id", addrass.getFromLocation);
};
