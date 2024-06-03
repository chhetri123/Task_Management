const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

/**
 * Express router for handling the login route.
 * @name router/login
 * @function
 * @param {string} path - The URL path for the login route ("/login").
 * @param {function} middleware - The middleware function to handle the login request.
 */
router.route("/login").post(authController.login);

/**
 * Express router for handling the register route.
 * @name router/register
 * @param {string} path - The URL path for the register route ("/register").
 * @param {function} middleware - The middleware function to handle the register request.
 */
router.route("/register").post(authController.signup);

/**
 * Express router for handling the logout route.
 * @name router/logout
 * @function
 * @param {string} path - The URL path for the logout route ("/logout").
 * @param {function} middleware - The middleware function to handle the logout request.
 */
router.route("/logout").get(authController.logout);

router.route("/islogin").get(authController.protect, authController.isLoggedIn);

module.exports = router;
