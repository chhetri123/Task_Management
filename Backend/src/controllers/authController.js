const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const { ROLE } = require("../utils/constant");
const { jwtExpireAt, jwtSecret } = require("../config/envConfig");
const jwt = require("jsonwebtoken");

/**
 * Creates a token for the user.
 * @param {Object} user - The user object.
 * @param {Object} res - The response object.
 */
const createSignToken = (user, res) => {
  user.password = undefined;
  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: jwtExpireAt,
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
  [];

  if (ROLE[req.body.role.toUpperCase()] === undefined) {
    return next(new AppError("Role does not exist", 404));
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    conformPassword: req.body.conformPassword,
    role: req.body.role,
  });

  createSignToken(user, res);
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

exports.isLoggedIn = (req, res, next) => {
  res.status(201).json({
    status: "success",
    user: req.user,
  });
};

exports.createSignToken = createSignToken;
