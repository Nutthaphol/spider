const detail = require("../controllers/detail.controllers");

module.exports = (app) => {
  app.get("/details", detail.allDetail);
};
