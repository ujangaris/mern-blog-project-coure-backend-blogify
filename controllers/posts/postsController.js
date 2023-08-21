const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
// @desc Create a new post
// @route POST /api/v1/possts
// @access Private

exports.createPost = asyncHandler(async (req, res) => {
  // console.log(req.file);//ini untuk melihat object dari file image
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
    image: req?.file?.path,
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
// @access Private

exports.getPosts = asyncHandler(async (req, res) => {
  // ! find all users who have blocked the logged-in user
  const loggedInUserId = req.userAuth?._id;
  // get current time
  const currentTime = new Date();
  const usersBlockingLoggedInUser = await User.find({
    blockedUsers: loggedInUserId,
  });

  // Extract the IDs of users whow have blocked the logged-in user
  const blockingUserIds = usersBlockingLoggedInUser?.map((user) => user?._id);

  // query
  const query = {
    author: { $nin: blockingUserIds },
    $or: [
      {
        scheduledPublished: { $lte: currentTime },
        scheduledPublished: null,
      },
    ],
  };
  const posts = await Post.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "email role username",
    })
    .populate({
      path: "category",
      model: "Category",
      select: "name",
    });

  res.status(200).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});
// @desc Get public posts
// @route GET /api/v1/posts
// @access Private

exports.getPublicPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");

  res.status(200).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});

// @desc Get single post
// @route GET /api/v1/posts/:id
// @access Public

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");

  res.status(200).json({
    status: "success",
    message: "Post successfully fetched",
    post,
  });
});

// @desc Delete post
// @route DELETE /api/v1/post/:id
// @access Private

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Post successfully deleted",
  });
});

// @desc Update post
// @route PUT /api/v1/posts/:id
// @access Private

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Post successfully updated",
    post,
  });
});

// @desc Liking a post
// @route PUT /api/v1/posts/likes/:id
// @access Private

exports.likePost = asyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //get the login user
  const userId = req.userAuth._id;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  // Toggle the user in post likes
  if (post.likes.includes(userId)) {
    // Remove the user from the likes array
    post.likes = post.likes.filter(
      (like) => like.toString() !== userId.toString()
    );
  } else {
    // Add the user to the likes array
    post.likes.addToSet(userId);

    // Remove the user from the dislikes array if present
    if (post.dislikes) {
      post.dislikes = post.dislikes.filter(
        (dislike) => dislike.toString() !== userId.toString()
      );
    }
  }
  // Save the updated post
  await post.save();
  // response status(200)
  res.status(200).json({ message: "Post liked successfully", post });
});

// @desc Dislike a post
// @route PUT /api/v1/posts/dislikes/:id
// @access Private

exports.disLikePost = asyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //get the login user
  const userId = req.userAuth._id;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  ///Push thr user into post dislikes

  // Toggle the user in post dislikes
  if (post.dislikes.includes(userId)) {
    // Remove the user from the dislikes array
    post.dislikes = post.dislikes.filter(
      (dislike) => dislike.toString() !== userId.toString()
    );
  } else {
    // Add the user to the dislikes array
    post.dislikes.addToSet(userId);

    // Remove the user from the likes array if present
    if (post.likes) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    }
  }

  // Save the updated post
  await post.save();
  // response status(200)
  res.status(200).json({ message: "Post disliked successfully", post });
});

// @desc clapong a post
// @route PUT /api/v1/posts/claps/:id
// @access Private

exports.claps = asyncHandler(async (req, res) => {
  // Get the id of the post
  const { id } = req.params;
  // Find the post
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  // Implement the claps using $inc
  await Post.findByIdAndUpdate(
    id,
    {
      $inc: { claps: 1 },
    },
    { new: true }
  );

  // Fetch the updated post
  const updatedPost = await Post.findById(id);

  // Response status(200)
  res
    .status(200)
    .json({ message: "Post clapped successfully", post: updatedPost });
});

// @desc Schedule a post
// @route PUT /api/v1/posts/schedule/:postId
// @access Private

exports.schedule = asyncHandler(async (req, res) => {
  // get the payload
  const { scheduledPublish } = req.body;
  const { postId } = req.params;
  // check if postId and scheduledPublish found
  if (!postId || !scheduledPublish) {
    throw new Error("PostID and schedule date are required");
  }
  // find the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  //check if the user is the author of the post
  if (post.author.toString() !== req.userAuth._id.toString()) {
    throw new Error("You can schedule your own post");
  }
  // check if the scheduledPublish date is in the past
  const scheduleDate = new Date(scheduledPublish);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    throw new Error("The scheduled publish date cannot be in the past.");
  }
  // update the post
  post.scheduledPublished = scheduledPublish;
  await post.save();
  // response success(200)
  res.status(200).json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});
