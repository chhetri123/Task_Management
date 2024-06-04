const mongoose = require("mongoose");
const validator = require("validator");
const { MODEL, PRIORITY_LEVELS, STATUS } = require("../utils/constant");

// Task Schema for MongoDB
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide title of Task"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [200, "Title must be  less than 200 characters"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: [STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.COMPLETED],
    default: STATUS.OPEN,
    validator: [validator.isIn, "Please provide valid status"],
  },

  priority: {
    type: String,
    enum: [PRIORITY_LEVELS.LOW, PRIORITY_LEVELS.MEDIUM, PRIORITY_LEVELS.HIGH],
    default: PRIORITY_LEVELS.LOW,
    validator: [validator.isIn, "Please provide valid priority"],
  },

  tags: [
    {
      type: String,
      trim: true,
      maxlength: [20, "Tag must be at most 20 characters"],
      default: [],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER_MODEL,
    required: true,
    validator: [validator.isMongoId, "Please provide valid owner"],
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return new Date(date) > Date.now();
      },
      message: "Please provide valid due date",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre Middleware for updating the updatedAt field
taskSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Pre Middleware for updating the updatedAt field
taskSchema.pre("up", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model(MODEL.TASK_MODEL, taskSchema);
