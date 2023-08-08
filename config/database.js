const mongoose = require("mongoose");
// connect to db

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ujangaja:ujang123@mern-blog-v1.pga3tix.mongodb.net/mern-blog?retryWrites=true&w=majority"
    );
    console.log("DB has been connected");
  } catch (error) {
    console.error("DB Connectiiion failed", error.message);
  }
};

module.exports = connectDB;
