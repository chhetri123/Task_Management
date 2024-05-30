const User = require("./../model/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const createSignToken = (user, res) => {
  user.password = undefined;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_AT,
  });

  res.status(200).json({ status: "success", token });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError("Invalid email or password", 200));
  }
  createSignToken(user, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  createSignToken(user, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Please login or Sign Up"), 401);
  }

  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("User belongs to this token does not exist"));
  }
  if (user.changePasswordAt(decode.iat)) {
    return next(
      new AppError("User recently changed password .Please login again"),
      401
    );
  }
  req.user = user;
  next();
});

//
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  // getting token and check of it is valid?
  try {
    if (req.cookies.jwt) {
      // verification token

      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );
      // check if user still exixts
      const currentUser = await User.findById(decode.id);
      if (!currentUser) return next();

      // check if user changed password after the token issued
      const isChanged = currentUser.changePasswordAfter(decode.iat);
      if (isChanged) {
        return next();
      }
      // next
      res.locals.user = currentUser;
      // req.user=
      return next();
    }
    next();
  } catch (err) {
    return next();
  }
};

//  Authorization Middle Authentication

exports.restrictTo = (...roles) => {
  // roles=["user","admin"]
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to do this action",
          StatusCodes.FORBIDDEN
        )
      );
    }

    next();
  };
};
