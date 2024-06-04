const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const router = express.Router();

// Protect routes
router.use(authMiddleware.protect);

/**
 *
 * @name router/user/
 * @function Router for user routes with  routes defined for get all users
 * @param {string} path - The URL path for the user route ("/")
 */
router
  .route("/")
  .get(authMiddleware.authorizedTo("admin"), userController.getUsers);
module.exports = router;
