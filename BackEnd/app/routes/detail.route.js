const detail = require("../controllers/detail.controller");

module.exports = (app) => {
  app.post("/api/detail/postdetail", detail.postDetail);
};
