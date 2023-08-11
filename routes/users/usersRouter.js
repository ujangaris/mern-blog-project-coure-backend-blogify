const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
} = require("../../controllers/users/usersController");
const isLoggin = require("../../middlewares/isLoggin");

const usersRouter = express.Router();

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

// * Export
module.exports = usersRouter;
