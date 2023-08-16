const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
// @desc Create a new category
// @route POST /api/v1/categories
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
// @route GET /api/v1/categories
// @access Public

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
    .populate({
      path: "posts",
      model: "Post",
    })
    .populate({
      path: "author",
      model: "User",
      select: "username email",
    });
  res.status(200).json({
    status: "success",
    message: "Categories successfully fetched",
    categories,
  });
});

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Categories successfully deleted",
  });
});

// @desc Update category
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Categories successfully updated",
    category,
  });
});
