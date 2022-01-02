const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.body.role = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.body.role === "admin") {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Admin Role!",
  });
};

expiration = (req, res, next) => {
  let token = req.headers["x-access-token"];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        expire: true,
      });
    }
    return res.status(200).send({
      expire: false,
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  expiration: expiration,
};
module.exports = authJwt;
