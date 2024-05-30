const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

// Protect routes
router.use(authController.protect);

/**
 *
 * @name router/user/
 * @function Router for user routes with  routes defined for get all users
 * @param {string} path - The URL path for the user route ("/")
 */
router
  .route("/")
  .get(authController.authorizedTo("admin"), userController.getUsers);
module.exports = router;
