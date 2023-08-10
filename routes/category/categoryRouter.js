const express = require("express");
const {
  createCategory,
} = require("../../controllers/categories/categoryController");
const isLoggin = require("../../middlewares/isLoggin");
const categoryRouter = express.Router();

// create category
categoryRouter.post("/", isLoggin, createCategory);
// * Export
module.exports = categoryRouter;
