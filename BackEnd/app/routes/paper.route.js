const paper = require("../controllers/paper.controller");

module.exports = (app) => {
  app.post("/api/paper/postpaper", paper.postPaper);
};
