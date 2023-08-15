const jwt = require("jsonwebtoken");
const User = require("../model/User/User");
const isLoggin = (req, res, next) => {
  //   console.log(req.headers);
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  //   console.log(token);
  // ? Verify the token
  jwt.verify(token, "anykey", async (err, decoded) => {
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
      return "Invalid token";
    } else {
      // !save the user
      // * send the user
      next();
    }
  });
};

module.exports = isLoggin;
