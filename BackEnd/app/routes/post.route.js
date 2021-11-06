const poster = require("../controllers/post.controllers");

module.exports = (app) => {
  app.post("/api/post/postfulldata", poster.FullData);
  app.post("/api/post/poststandarddata", (req, res) => {
    res.send(req.body);
  });
};
