const express = require("express");
const { register, login } = require("../../controllers/users/usersController");

const usersRouter = express.Router();

// ! Register
usersRouter.post("/api/v1/users/register", register);
//  Login
usersRouter.post("/api/v1/users/login", login);

// * Export
module.exports = usersRouter;
