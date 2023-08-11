const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");

// @desc Register a new user
// @route Post /api/v1/users/register
// @access Public

exports.register = asyncHandler(async (req, res) => {
  // get the details
  const { username, email, password } = req.body;

  // ! Check if user exists
  const user = await User.findOne({ username });
  if (user) {
    throw new Error(`User ${username} already exists`);
  }
  // Register new user
  const newUser = new User({
    username,
    email,
    password,
  });
  // ! has password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  // save
  await newUser.save();
  // cetak response
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    newUser,
  });
});

// @desc Login user
// @route Post /api/v1/users/login
// @access Public

exports.login = asyncHandler(async (req, res) => {
  // ? get teh login details
  const { username, password } = req.body;
  // ! Check if exists
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  // compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  // Update  the last login
  user.lastLogin = new Date();
  // save user untuk perubahan lastLogin
  await user.save();
  res.json({
    status: "success",
    _id: user?._id,
    email: user?.email,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

// @desc Get profile
// @route Post /api/v1/users/profile/:id
// @access Private

exports.getProfile = asyncHandler(async (req, res, next) => {
  // ! get user id from params
  // const id = req.params.id;
  const id = req.userAuth._id;
  const user = await User.findById(id);
  console.log(user);
  res.json({
    status: "success",
    message: "Profile fetched",
    data: "user data",
    user,
  });
});

// @desc Block  user
// @route Put /api/v1/users/block/:userIdToBlock
// @access Private

exports.blockUser = asyncHandler(async (req, res) => {
  // * Find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    throw new Error("User to block not found");
  }
  // ! user who isblocking
  const userBlocking = req.userAuth._id;
  // check if user is blockung him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("Cannot block yourself");
  }
  // check if user is blockung him/herself
  const currentUser = await User.findById(userBlocking);
  // ?check if the user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already blocked");
  }
  // push the user to be blocked in the array of the current user
  currentUser?.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  // response code(200)
  res.status(200).json({
    status: "success",
    message: "User blocked successfully",
  });
});

// @desc Unblock  user
// @route Put /api/v1/users/unblock/:userIdToUnBlock
// @access Private

exports.unblockUser = asyncHandler(async (req, res) => {
  // * Find the user to be unblocked
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    throw new Error("User to be unblock not found");
  }
  // find the current user
  const userUnBlocking = req.userAuth._id;
  const currentUser = await User.findById(userUnBlocking);

  // check if user is blocked before unblocking
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    throw new Error("User not block");
  }
  //remove the user from current user blocked users array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() != userIdToUnBlock.toString()
  );
  // resave the current user
  await currentUser.save();
  // response code (200)
  res.status(200).json({
    status: "success",
    message: "User unblocked successfully",
  });
});

// @desc who view my profile
// @route Get /api/v1/users/profile-viewer/:userProfileId
// @access Private

exports.profileViewers = asyncHandler(async (req, res) => {
  // * Find that w want to view his profile
  const userProfileId = req.params.userProfileId;
  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    throw new Error("User to view his profile not found");
  }

  //find the current user
  const currentUserId = req.userAuth._id;
  // ?check if the user already view the profile
  if (userProfile?.profileViewers?.includes(currentUserId)) {
    throw new Error("You have already viewed this profile");
  }
  // push the current user id into the user profile
  userProfile?.profileViewers.push(currentUserId);
  await userProfile.save();
  // response code(200)
  res.status(200).json({
    status: "success",
    message: "You have successfully viewed his/hem profile",
  });
});

// @desc Following user
// @route Put /api/v1/users/following/:userIdToFollow
// @access Private

exports.followingUser = asyncHandler(async (req, res) => {
  // find the current user
  const currentUserId = req.userAuth._id;
  // !find the user to follow
  const userToFollowId = req.params.userToFollowId;
  // Avoid user following himself
  if (currentUserId.toString() === userToFollowId.toString()) {
    throw new Error("You cannot yourself");
  }
  // push the userToFollowId into the current user following field
  await User.findByIdAndUpdate(
    currentUserId,
    {
      $addToSet: { following: userToFollowId },
    },
    {
      new: true,
    }
  );
  // push the currentUserId into the user to follow followers field
  await User.findByIdAndUpdate(
    userToFollowId,
    {
      $addToSet: { followers: currentUserId },
    },
    {
      new: true,
    }
  );
  // send the response(200)
  res.status(200).json({
    status: "success",
    message: "You followed the user successfully",
  });
});
