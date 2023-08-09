const isLoggin = (req, res, next) => {
  //   console.log(req.headers);
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  // ? Verify the token
  // !save the user
  // * send the user
  next();
};

module.exports = isLoggin;
