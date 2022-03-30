const route = require("express").Router();
const auth_middleware = require("../middlewares/auth.middleware");
const user_controller = require("../controllers/user.controller");

route.get("/me", auth_middleware.verifyToken, (req, res) => {
  user_controller.UserInfo(req, res);
  // return res.json({ status: true, data: req.user });
});

module.exports = route;
