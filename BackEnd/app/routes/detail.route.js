const detail = require("../controllers/detail.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use(function (req, res, next) {
    console.log(`req username ${req.body}`);
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/detail/postDetail",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail.postDetail
  );
  app.post(
    "/api/detail/updateDatailType",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail.updateDetailType
  );
  app.post(
    "/api/detail/updateDatail",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail.updateDetail
  );
  app.get("/api/detail/get/:id", detail.getDetail);
  app.get(
    "/api/admin/detail/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail.getDetailAdmin
  );
  app.get("/api/detail", detail.getAllDetail);
  app.get(
    "/api/admin/detail",
    [authJwt.verifyToken, authJwt.isAdmin],
    detail.getAllDetailAdmin
  );
};
