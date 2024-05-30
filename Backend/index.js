const express = require("express");
const cors = require("cors");
const app = express();

const globalErrorHandler = require("./controller/errorController");

// Routes
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(globalErrorHandler);
module.exports = app;
