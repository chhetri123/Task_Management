const User = require("./../model/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

/**
 * Creates a token for the user.
 * @param {Object} user - The user object.
 * @param {Object} res - The response object.
 */
const createSignToken = (user, res) => {
  user.password = undefined;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_AT,
  });

  res.status(200).json({ status: "success", user, token });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError("Invalid email or password", 200));
  }
  createSignToken(user, res);
});

/**
 * Creates a new user.
 * @function signup
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the created user.
 * function :- It creates a new user
 */
exports.signup = catchAsync(async (req, res, next) => {
  const isUserExist = await User.findOne({ email: req.body.email });
  if (isUserExist) {
    return next(new AppError("User already exists", 200));
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    conformPassword: req.body.conformPassword,
  });

  createSignToken(user, res);
});

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
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("User belongs to this token does not exist"), 401);
  }

  req.user = user;
  next();
});

//
/**
 * Logs out the user.
 * @function logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the status.
 * funtion :- It logs out the user
 */
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

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

exports.isLoggedIn = (req, res, next) => {
  res.status(201).json({
    status: "success",
    user: req.user,
  });
};
