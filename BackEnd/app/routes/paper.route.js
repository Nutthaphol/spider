const paper = require("../controllers/paper.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
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
