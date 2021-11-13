const image = require("../controllers/image.controller");

module.exports = (app, upload) => {
  app.post("/api/image/postimage", upload.single("image"), image.postImage);
};
