const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
require("./config/database")();

// !Server
const app = express();

// middlewares
app.use(express.json()); //Pass incoming data

// Routes
app.use("/api/v1/users", usersRouter);
// ? Not Found middleware
app.use(notFound);
// ! Error Middleware
app.use(globalErrorHandler);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
