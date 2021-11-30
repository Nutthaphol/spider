const addrass = require("../controllers/address.controller");

module.exports = (app) => {
  app.post("/api/address/postAddress", addrass.postAddress);
  app.get("/api/address/:id", addrass.getAddress);
  app.get("/api/address", addrass.getAllAddress);
  app.get("/api/address/getFromLocationId/:id", addrass.getFromLocation);
};
