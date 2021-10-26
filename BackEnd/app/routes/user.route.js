const user = require("../controllers/user.controllers");

module.exports = (app) => {
  app.get("/users", user.allUser);
};
