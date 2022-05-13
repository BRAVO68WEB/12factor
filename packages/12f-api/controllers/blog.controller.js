const Blog = require("../models/blog.model");

async function createPost(req, res, next) {
  const blog = new Blog({
    Title: req.body.Title,
    Content: req.body.Content,
    Tags: req.body.Tags,
    Author: req.userData.sub,
    isDraft: true,
    isPublished: false,
    reference: req.body.reference,
  });
  try {
    const savedBlog = await blog.save();
    res.json({
      status: true,
      message: "Blog created successfully.",
      data: savedBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
      data: error,
    });
  }
}

async function updatePost(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found.",
        data: null,
      });
    }
    if (blog.Author.toString() !== req.userData.sub) {
      return res.status(401).json({
        status: false,
        message: "You are not authorized to update this blog.",
        data: null,
      });
    }
    blog.Title = req.body.Title;
    blog.Content = req.body.Content;
    blog.Tags = req.body.Tags;
    blog.reference = req.body.reference;
    const updatedBlog = await blog.save();
    res.json({
      status: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
      data: error,
    });
  }
}

module.exports = {
  createPost,
  updatePost,
};
