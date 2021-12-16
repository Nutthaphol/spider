const paper = require("../controllers/paper.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.post(
    "/api/paper/postPaper",
    [authJwt.verifyToken, authJwt.isAdmin],
    paper.postPaper
  );
  app.post(
    "/api/paper/updatePaper",
    [authJwt.verifyToken, authJwt.isAdmin],
    paper.updatePaper
  );
  app.get("/api/paper/:id", paper.getPaper);
  app.get(
    "/api/admin/paper/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    paper.getPaperAdmin
  );
};
