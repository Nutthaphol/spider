const config = require("../config/auth.config");
const db = require("../models/user.model");
const getAllUser = db.getAllUser;

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  getAllUser((error, result) => {
    try {
      let profile = result.find((item) => item.username === req.body.username);

      if (profile) {
        let passwordValid = req.body.password == profile.password;

        if (!passwordValid) {
          console.log(`password fail`);
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password",
          });
        }

        let token = jwt.sign({ id: profile.id_user }, config.secret, {
          expiresIn: 43200, // 12 hours
        });
        res.status(200).send({
          id: profile.id,
          username: profile.username,
          roles: profile.auth,
          accessToken: token,
        });
      } else {
        return res.status(404).send({ message: "User Not found." });
      }
    } catch (error) {
      console.log(`error.message : ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  });
};
