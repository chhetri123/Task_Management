/**
 * @file Task Controller
 * @description Contains controller functions for handling task-related operations.
 * @module TaskController
 */

const Task = require("./../models/taskModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const AppFeature = require("./../utils/apiFeatures");
const { ROLE } = require("./../utils/constant");

/**
 * Filters the query based on user's role permission.
 * @param {Object} user - The user object.
 * @param {Object} fieldObjects - The field objects to filter.
 * @returns {Object} The filtered field objects based on user's role permission.
 */
const filterQueryByPermission = (user, fieldObjects) => {
  switch (user.role) {
    case ROLE.ADMIN:
      return fieldObjects;
    case ROLE.USER:
      return { owner: user._id, ...fieldObjects };
    default:
      return {};
  }
};

/**
 * Filters the request body based on allowed fields.
 * @param {Object} requestObj - The request object.
 * @returns {Object} The filtered request object with allowed fields.
 */
const filterRequestBody = (filteredObject, requestObj) => {
  const filteredRequestObj = Object.keys(requestObj).reduce((acc, key) => {
    if (filteredObject.includes(key)) {
      acc[key] = requestObj[key];
    }
    return acc;
  }, {});
  return filteredRequestObj;
};

/**
 * Creates a new task.
 * @function createTask
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the created task.
 */
exports.createTask = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const filteredObject = [
    "title",
    "description",
    "status",
    "priority",
    "tags",
    "dueDate",
  ];

  const filteredRequestObj = filterRequestBody(filteredObject, req.body);
  const task = await Task.create({ ...filteredRequestObj, owner: userId });
  if (!task) {
    return next(new AppError("Task not created", 400));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});

/**
 * Updates a task.
 * @function updateTask
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the updated task.
 */
exports.updateTask = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;

  // Filter Out the Unwatned Fields
  const filteredObject = [
    "title",
    "description",
    "status",
    "priority",
    "tags",
    "dueDate",
  ];
  const updatedFields = filterRequestBody(filteredObject, req.body);

  // Checks if roles and change query parameters dynamically
  const fields = filterQueryByPermission(req.user, {
    _id: taskId,
  });

  // find and update task
  const task = await Task.findOneAndUpdate(fields, updatedFields, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});

/**
 * Deletes a task.
 * @function deleteTask
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a success message.
 */
exports.deleteTask = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;
  const fields = filterQueryByPermission(req.user, {
    _id: taskId,
  });
  const task = await Task.findOneAndDelete(fields);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

/**
 * Retrieves a task by ID.
 * @function getTaskById
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the retrieved task.
 */
exports.getTaskById = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;
  const fields = filterQueryByPermission(req.user, {
    _id: taskId,
  });
  const task = await Task.findOne(fields).populate("owner", "name");
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});

/**
 * Retrieves tasks with filters.
 * @function getTasks
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the retrieved tasks.
 */
exports.getTasks = catchAsync(async (req, res, next) => {
  const filteredObject = filterQueryByPermission(req.user, {});

  const features = new AppFeature(
    Task.find().populate("owner", "name"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const tasks = await features.query.find(filteredObject);
  res.status(200).json({
    status: "success",
    results: tasks.length,
    tasks,
  });
});
