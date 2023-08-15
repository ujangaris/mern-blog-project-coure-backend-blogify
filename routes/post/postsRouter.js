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
  claps,
  schedule,
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

// clap post
postsRouter.put("/claps/:id", isLoggin, claps);

// schedule post
postsRouter.put("/schedule/:postId", isLoggin, schedule);
// * Export
module.exports = postsRouter;
