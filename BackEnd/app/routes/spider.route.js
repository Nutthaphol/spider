const spiderList = require("../controllers/spider.controllers");

module.exports = (app) => {
  app.get("/spiderList", spiderList.allSpider);
};
