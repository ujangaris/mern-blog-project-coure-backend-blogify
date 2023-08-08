const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");

// !Server
const app = express();

// Routes
app.use("/", usersRouter);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
