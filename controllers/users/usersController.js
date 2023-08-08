// @desc Register a new user
// @route Post /api/v1/users/register
// @access Public

const User = require("../../model/User/User");
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
    // save
    await newUser.save();
    // cetak response
    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
      _id: newUser?._id,
      username: newUser?.username,
      email: newUser?.email,
      role: newUser?.role,
    });
  } catch (error) {
    res.json({
      status: "faild",
      message: error?.message,
    });
  }
};
