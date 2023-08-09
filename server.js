const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
require("./config/database")();

// !Server
const app = express();

// middlewares
app.use(express.json()); //Pass incoming data

// Routes
app.use("/api/v1/users", usersRouter);
// ! Error Middleware
app.use((err, req, res, next) => {
  //   console.log(err);
  //   status
  const status = err?.status ? err?.status : "failed";
  // message
  const message = err?.message;
  // stack
  const stack = err?.stack;
  res.status(500).json({
    status,
    message,
    stack,
  });
});

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
