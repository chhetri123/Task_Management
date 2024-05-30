const express = require("express");
const cors = require("cors");
const app = express();

const globalErrorHandler = require("./controller/errorController");

// Routes
const authRouter = require("./routes/authRouter");

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);
module.exports = app;
