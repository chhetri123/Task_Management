const AppError = require("../utils/appError");

/**
 * Creates an AppError instance for an invalid token.
 * @returns {AppError} The AppError instance with a message and status code.
 */
const sendJWTHandleDB = () => {
  const message = `Invalid Token . Please log In`;
  return new AppError(message, 401);
};

/**
 * Creates an AppError instance for an expired token.
 * @returns {AppError} The AppError instance with a message and status code.
 */
const sendTokenExpired = () => {
  const message = `Token Expired . Please log In`;
  return new AppError(message, 401);
};

/**
 * Creates an AppError instance for validation errors.
 * @param {Error} error - The validation error object.
 * @returns {AppError} The AppError instance with a message and status code.
 */
const sendValidationError = (error) => {
  const { errors } = error;
  const validationErrors = {};

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      const { message: errorMessage } = errors[key];
      validationErrors[key] = errorMessage;
    }
  }
  return new AppError(JSON.stringify(validationErrors), 400);
};

/**
 * Sends detailed error response in the development environment.
 * @param {Error} err - The error object.
 * @param {Object} res - The response object.
 */
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

/**
 * Sends error response in the production environment.
 * @param {Error} err - The error object.
 * @param {Object} res - The response object.
 */
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * Error handling middleware for the backend controller. (Global Error Handler)
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Function} The next middleware function.
 *
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    if (error.message === "JsonWebTokenError") error = sendJWTHandleDB();
    if (error.name === "TokenExpiredError") error = sendTokenExpired();
    if (error.name === "ValidationError") error = sendValidationError(error);
    sendProdError(error, res);
  }
  next();
};
