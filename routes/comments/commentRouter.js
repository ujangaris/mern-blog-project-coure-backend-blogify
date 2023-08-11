const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createComment,
} = require("../../controllers/comments/commentController");
const commentsRouter = express.Router();

// create comment
commentsRouter.post("/:postId", isLoggin, createComment);
// * Export
module.exports = commentsRouter;
