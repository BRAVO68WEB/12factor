const route = require("express").Router();
const auth_middleware = require("../middlewares/auth.middleware");
const blog_controller = require("../controllers/blog.controller");

route.post("/", auth_middleware.verifyToken, (req, res) => {
    blog_controller.createPost(req, res);
});
route.patch("/:id", auth_middleware.verifyToken, (req, res) => {
    blog_controller.updatePost(req, res);
})

module.exports = route;
