const express = require("express");
const multer = require("multer");

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
  getPublicPosts,
} = require("../../controllers/posts/postsController");
const checkAccountVerification = require("../../middlewares/isAccountVerified");
const storage = require("../../utils/fileUpload");

const postsRouter = express.Router();
//! file upload middleware
const upload = multer({ storage });

// create post
postsRouter.post(
  "/",
  isLoggin,
  checkAccountVerification,
  upload.single("file"),
  createPost
);
// getting all posts
postsRouter.get("/", isLoggin, getPosts);
// public posts
postsRouter.get("/public", getPublicPosts);
//  single post
postsRouter.get("/:id", getPost);
//  update post
postsRouter.put("/:id", isLoggin, updatePost);
//  delete post
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
