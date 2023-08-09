const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersController");
const isLoggin = require("../../middlewares/isLoggin");

const usersRouter = express.Router();

// ! Register
usersRouter.post("/register", register);
//  Login
usersRouter.post("/login", login);
//  Profile
usersRouter.get("/profile/:id", isLoggin, getProfile);

// * Export
module.exports = usersRouter;
