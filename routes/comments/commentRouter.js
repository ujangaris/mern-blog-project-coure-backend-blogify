const express = require("express");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../../controllers/comments/commentController");
const commentsRouter = express.Router();

// create comment
commentsRouter.post("/:postId", isLoggin, createComment);
// update comment
commentsRouter.put("/:id", isLoggin, updateComment);
// delete comment
commentsRouter.delete("/:id", isLoggin, deleteComment);
// * Export
module.exports = commentsRouter;
