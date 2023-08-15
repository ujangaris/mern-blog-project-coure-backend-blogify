const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
} = require("../../controllers/posts/postsController");
const checkAccountVerification = require("../../middlewares/isAccountVerified");
const postsRouter = express.Router();

// create post
postsRouter.post("/", isLoggin, checkAccountVerification, createPost);
// getting all posts
postsRouter.get("/", getPosts);
// getting single post
postsRouter.get("/:id", getPost);
// getting update post
postsRouter.put("/:id", isLoggin, updatePost);
// getting delete post
postsRouter.delete("/:id", isLoggin, deletePost);

// like post
postsRouter.put("/likes/:id", isLoggin, likePost);
// dislike post
postsRouter.put("/dislikes/:id", isLoggin, disLikePost);
// * Export
module.exports = postsRouter;
