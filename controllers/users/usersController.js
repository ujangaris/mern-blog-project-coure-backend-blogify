const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
// @desc Register a new user
// @route Post /api/v1/users/register
// @access Public

exports.register = async (req, res) => {
  // console.log(req.body);
  try {
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
      // _id: newUser?._id,
      // username: newUser?.username,
      // email: newUser?.email,
      // role: newUser?.role,
      newUser,
    });
  } catch (error) {
    res.json({
      status: "faild",
      message: error?.message,
    });
  }
};

// @desc Login user
// @route Post /api/v1/users/login
// @access Public

exports.login = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};

// @desc Get profile
// @route Post /api/v1/users/profile/:id
// @access Private

exports.getProfile = async (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Profile fetched",
      data: "user data",
    });
  } catch (error) {
    res.json({
      status: "success",
      message: error?.message,
    });
  }
};
