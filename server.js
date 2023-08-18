const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const categoryRouter = require("./routes/category/categoryRouter");
const postsRouter = require("./routes/post/postsRouter");
const commentRouter = require("./routes/comments/commentRouter");
require("./config/database")();

// !Server
const app = express();
// middlewares
app.use(express.json()); //Pass incoming data
// cors middleware
app.use(cors());

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentRouter);
// ? Not Found middleware
app.use(notFound);
// ! Error Middleware
app.use(globalErrorHandler);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
