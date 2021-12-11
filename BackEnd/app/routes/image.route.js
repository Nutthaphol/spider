const image = require("../controllers/image.controller");

module.exports = (app, upload) => {
  app.post("/api/image/postImage", upload.single("image"), image.postImage);
  app.post("/api/image/updateImage", image.updateImage);
  app.get("/api/image/:id", image.getImage);
  app.get("/api/admin/image/:id", image.getImageAdmin);
};
