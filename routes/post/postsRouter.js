const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const { createPost } = require("../../controllers/posts/postsController");
const postsRouter = express.Router();

// create post
postsRouter.post("/", isLoggin, createPost);
// * Export
module.exports = postsRouter;
