const image = require("../controllers/image.controller");
const { authJwt } = require("../middleware");

module.exports = (app, upload) => {
  app.post(
    "/api/image/postImage",
    upload.single("image"),
    [authJwt.verifyToken, authJwt.isAdmin],
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
