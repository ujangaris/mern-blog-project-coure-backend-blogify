const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersController");

const usersRouter = express.Router();

// ! Register
usersRouter.post("/register", register);
//  Login
usersRouter.post("/login", login);
//  Profile
usersRouter.get("/profile/:id", getProfile);

// * Export
module.exports = usersRouter;
