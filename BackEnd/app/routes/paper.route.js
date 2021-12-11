const paper = require("../controllers/paper.controller");

module.exports = (app) => {
  app.post("/api/paper/postPaper", paper.postPaper);
  app.post("/api/paper/updatePaper", paper.updatePaper);
  app.get("/api/paper/:id", paper.getPaper);
  app.get("/api/admin/paper/:id", paper.getPaperAdmin);
};
