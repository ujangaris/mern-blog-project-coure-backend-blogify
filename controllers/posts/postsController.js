const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
// @desc Create a new post
// @route POST /api/v1/possts
// @access Private

exports.createPost = asyncHandler(async (req, res) => {
  // Get the payload
  const { title, content, categoryId } = req.body;
  //   check if post exists
  const postFound = await Post.findOne({ title });
  if (postFound) {
    throw new Error(`Post ${title} already exists`);
  }
  //   create post
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });
  // ! Associate post to user
  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );
  // * Push post into category
  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );
  // ? send the response
  res.status(201).json({
    status: "success",
    message: "Post Successfully Created",
    post,
  });
});

// @desc Get all posts
// @route GET /api/v1/posts
// @access Public

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});
