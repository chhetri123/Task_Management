const express = require("express");
const authController = require("../controller/authController");
const taskController = require("../controller/taskController");
const router = express.Router();

//
router.use(authController.protect);

/**
 *
 * @name router/task/
 * @function
 * @param {string} path - The URL path for the task route ("/")
 * @param {string} params - The parameters for the task route.
 * @param {function} middleware - The middleware function to handle the task request.
 * @param {function} middleware - The middleware function to handle the task request.
 */
router
  .route("/")
  .post(authController.authorizedTo("user"), taskController.createTask)
  .get(taskController.getTasks);

/**
 *
 * @name router/task/:id
 * @function
 * @param {string} path - The URL path for the task route ("/:id")
 * @param {string} params - The parameters for the task route.
 * @param {function} middleware - The middleware function to handle the task request.
 * @param {function} middleware - The middleware function to handle the task request.
 * @param {function} middleware - The middleware function to handle the task request.
 */
router
  .route("/:id")
  .put(taskController.updateTask)
  .get(taskController.getTaskById)
  .delete(taskController.deleteTask);
module.exports = router;
