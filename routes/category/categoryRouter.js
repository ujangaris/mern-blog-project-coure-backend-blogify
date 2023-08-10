const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../../controllers/categories/categoryController");
const isLoggin = require("../../middlewares/isLoggin");
const categoryRouter = express.Router();

// create category
categoryRouter.post("/", isLoggin, createCategory);
//? all category
categoryRouter.get("/", getCategories);
// * Export
module.exports = categoryRouter;
