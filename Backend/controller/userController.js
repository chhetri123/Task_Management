const User = require("./../model/userModel");

/**
 * Get all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with the list of users.
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      users,
    });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};
