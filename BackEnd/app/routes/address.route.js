const addrass = require("../controllers/address.controller");

module.exports = (app) => {
  app.post("/api/address/postaddress", addrass.postAddress);
};
