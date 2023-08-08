const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
require("./config/database")();

// !Server
const app = express();

// middlewares
app.use(express.json()); //Pass incoming data

// Routes
app.use("/", usersRouter);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
