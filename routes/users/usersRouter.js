const express = require("express");
const multer = require("multer");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser,
  unFollowingUser,
  forgotPassword,
  resetPassword,
  accountVerificationEmail,
  verifyAccount,
} = require("../../controllers/users/usersController");
const isLoggin = require("../../middlewares/isLoggin");
const storage = require("../../utils/fileUpload");

const usersRouter = express.Router();

//! file upload middleware
const upload = multer({ storage });

// ! Register
usersRouter.post("/register", register);
//  Login
usersRouter.post("/login", login);
//  Profile
// usersRouter.get("/profile/:id", isLoggin, getProfile);
usersRouter.get("/profile/", isLoggin, getProfile); //ini harusnya kita buat error jika id kosong

// block user
usersRouter.put("/block/:userIdToBlock", isLoggin, blockUser);
// unblock user
usersRouter.put("/unblock/:userIdToUnBlock", isLoggin, unblockUser);

// profile viewers
usersRouter.get("/profile-viewer/:userProfileId", isLoggin, profileViewers);

// following
usersRouter.put("/following/:userToFollowId", isLoggin, followingUser);
// unfollowing
usersRouter.put("/unfollowing/:userToUnFollowId", isLoggin, unFollowingUser);

// forgot password
usersRouter.post("/forgot-password", forgotPassword);
// reset password
usersRouter.post("/reset-password/:resetToken", resetPassword);

// send account verification email
usersRouter.put(
  "/account-verification-email",
  isLoggin,
  accountVerificationEmail
);
//  verify account
usersRouter.put("/account-verification/:verifyToken", isLoggin, verifyAccount);

// * Export
module.exports = usersRouter;
