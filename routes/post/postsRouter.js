const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
} = require("../../controllers/posts/postsController");
const postsRouter = express.Router();

// create post
postsRouter.post("/", isLoggin, createPost);
postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
// * Export
module.exports = postsRouter;
