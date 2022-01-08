const family = require("../controllers/family.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/family/allfamily", family.allFamily);
  app.get("/api/family/:id", family.getFamily);
  app.post(
    "/api/family/postfamily",
    [authJwt.verifyToken, authJwt.isAdmin],
    family.postFamily
  );
};
