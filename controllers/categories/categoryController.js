const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
// @desc Create a new category
// @route Post /api/v1/categories
// @access Private

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, author } = req.body;
  //   !if exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
  const category = await Category.create({
    name: name,
    author: req.userAuth?._id,
  });
  res.status(201).json({
    status: "success",
    message: "Category successfully cerated",
    category,
  });
});

// @desc Get all category
// @route Get /api/v1/categories
// @access Public

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    status: "success",
    message: "Categories successfully fetched",
    categories,
  });
});
