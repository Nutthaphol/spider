const position = require("../controllers/position.controller");

module.exports = (app) => {
  app.post("/api/position/postposition", position.postPosition);
};
