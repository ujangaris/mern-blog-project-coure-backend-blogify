const isLoggin = (req, res, next) => {
  console.log("isLoggin middleware");
  // Get token from header
  // ? Verify the token
  // !save the user
  // * send the user
  next();
};

module.exports = isLoggin;
