const asyncHandler = require("express-async-handler");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");

// @desc Create a new comments
// @route POST /api/v1/comments/:postId
// @access Private

exports.createComment = asyncHandler(async (req, res) => {
  // get the payload
  const { message, author } = req.body;
  //   get postId from params
  const postId = req.params.postId;

  //* Create comment
  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    postId,
  });
  //   Associate comment to a post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  //   send the response
  res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});
