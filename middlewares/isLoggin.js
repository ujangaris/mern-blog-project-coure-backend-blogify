const jwt = require("jsonwebtoken");
const User = require("../model/User/User");
const isLoggin = (req, res, next) => {
  //   console.log(req.headers);
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  //   console.log(token);
  // ? Verify the token
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    // add user to req obj
    //get the user id
    const userId = decoded?.user?.id;
    // console.log(userId);
    //dengan select tampilkan data user yang ingin ditampilkan
    const user = await User.findById(userId).select("username email role _id");
    // console.log(user);//data lengkap user akan tampil
    // save user into req obj
    req.userAuth = user;
    if (err) {
      const err = new Error("token expired/Invalid");
      next(err);
    } else {
      next();
    }
  });
};

module.exports = isLoggin;
