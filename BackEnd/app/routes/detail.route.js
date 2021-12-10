const detail = require("../controllers/detail.controller");

module.exports = (app) => {
  app.post("/api/detail/postDetail", detail.postDetail);
  app.post("/api/detail/updateDatailType", detail.updateDetailType);
  app.post("/api/detail/updateDatail", detail.updateDetail);
  app.get("/api/detail/get/:id", detail.getDetail);
  app.get("/api/admin/detail/get/:id", detail.getDetailAdmin);
  app.get("/api/detail", detail.getAllDetail);
  app.get("/api/admin/detail", detail.getAllDetailAdmin);
};
