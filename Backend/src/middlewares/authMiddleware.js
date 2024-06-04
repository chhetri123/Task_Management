const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/envConfig");

/**
 * Protects the route.
 * @function protect
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * funtion :- It protect all the routes which require authentication
 */

exports.protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Please login or Sign Up"), 401);
  }
  const token = req.headers.authorization.split(" ")[1];

  const decode = jwt.verify(token, jwtSecret);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("User belongs to this token does not exist"), 401);
  }

  req.user = user;
  next();
});

//  Authorization Middle Authentication
/**
 * Checks if the user is authorized to perform an action.
 * @function authorizedTo
 * @param {Array} roles - The roles array.
 * @returns {Function} The middleware function.
 * funtion :- It checks if the user is authorized to perform an action
 */
exports.authorizedTo = (...roles) => {
  // roles=["user","admin"]
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to do this action", 403)
      );
    }

    next();
  };
};
