const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// import middlewares
const globalErrorHandler = require("./middlewares/errorMiddleware");

// Routes
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(globalErrorHandler);

module.exports = app;
