const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
} = require("../../controllers/posts/postsController");
const postsRouter = express.Router();

// create post
postsRouter.post("/", isLoggin, createPost);
postsRouter.get("/", isLoggin, getPosts);
// * Export
module.exports = postsRouter;
