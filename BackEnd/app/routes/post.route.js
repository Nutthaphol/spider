const poster = require("../controllers/post.controllers");
var multer = require("multer");
var upload = multer({ dest: "./app/image" });

module.exports = (app) => {
  app.post("/api/post/postfulldata", upload.array("image"), poster.FullData);
  app.post("/api/post/poststandarddata", (req, res) => {
    res.send(req.body);
  });
};
