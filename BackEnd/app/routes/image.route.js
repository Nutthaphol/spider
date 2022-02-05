const image = require("../controllers/image.controller");
const { authJwt } = require("../middleware");

module.exports = (app, upload, unlink) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/image/postImage",
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.single("image"),
    image.postImage
  );
  app.post(
    "/api/image/updateImage",
    [authJwt.verifyToken, authJwt.isAdmin],
    image.updateImage
  );
  app.get("/api/image/:id", image.getImage);
  app.get(
    "/api/admin/image/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    image.getImageAdmin
  );
};
