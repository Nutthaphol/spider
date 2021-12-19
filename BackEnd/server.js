const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "./app/image" });

const cors = require("cors");

const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("build"));

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:3001",
  ],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/image", express.static("./app/image"));

app.get("/app/image/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log("params", filename);
  const readStream = fs.createReadStream(
    path.join(__dirname, "app/image/", filename)
  );
  readStream.pipe(res);
});

app.get("/", (req, res) => {
  res.send(`Server is running !`);
});

require("./app/routes/auth.route")(app);
require("./app/routes/family.route")(app);
require("./app/routes/genus.route")(app);
require("./app/routes/species.route")(app);
require("./app/routes/detail.route")(app);
require("./app/routes/location.route")(app);
require("./app/routes/address.route")(app);
require("./app/routes/paper.route")(app);
require("./app/routes/image.route")(app, upload);
require("./app/routes/province.route")(app);
require("./app/routes/district.route")(app);

const PORT = process.env.PORT || 8080;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(PORT, (res, req) => {
  console.log(`Back-end run on port ${PORT}`);
});
