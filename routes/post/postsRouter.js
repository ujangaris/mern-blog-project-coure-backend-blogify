const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../../controllers/posts/postsController");
const postsRouter = express.Router();

// create post
postsRouter.post("/", isLoggin, createPost);
// getting all posts
postsRouter.get("/", getPosts);
// getting single post
postsRouter.get("/:id", getPost);
// getting update post
postsRouter.put("/:id", isLoggin, updatePost);
// getting delete post
postsRouter.delete("/:id", isLoggin, deletePost);
// * Export
module.exports = postsRouter;
