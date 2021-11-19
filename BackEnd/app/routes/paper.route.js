const paper = require("../controllers/paper.controller");

module.exports = (app) => {
  app.post("/api/paper/postpaper", paper.postPaper);
  app.get("/api/paper/:id", paper.getPaper);
};
