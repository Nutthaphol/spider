const user = require("../controllers/auth.controllers");

module.exports = (app) => {
  // app.use(function (req, res, next) {
  //   console.log(`req username ${req.body}`);
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.post("/api/auth/signin", user.signin);
};
