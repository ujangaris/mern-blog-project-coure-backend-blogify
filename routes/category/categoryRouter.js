const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../../controllers/categories/categoryController");
const isLoggin = require("../../middlewares/isLoggin");
const categoryRouter = express.Router();

// create category
categoryRouter.post("/", isLoggin, createCategory);
//? all category
categoryRouter.get("/", getCategories);
//* update category
categoryRouter.put("/:id", isLoggin, updateCategory);
//! delete category
categoryRouter.delete("/:id", isLoggin, deleteCategory);
// * Export
module.exports = categoryRouter;
