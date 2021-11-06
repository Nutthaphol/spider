const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const path = require("path");
const app = express();

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

// app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send(`Server is running !`);
});

require("./app/routes/auth.route")(app);
require("./app/routes/family.route")(app);
require("./app/routes/genus.route")(app);
require("./app/routes/species.route")(app);
require("./app/routes/post.route")(app);
// require("./app/routes/position.route")(app);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build/index.html"));
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, (res, req) => {
  console.log(`Back-end run on port ${PORT}`);
});
