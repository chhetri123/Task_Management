const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide title of Task"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [32, "Title must be at most 32 characters"],
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
    enum: ["open", "in progress", "completed"],
    default: "open",
    validator: [validator.isIn, "Please provide valid status"],
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
    validator: [validator.isIn, "Please provide valid priority"],
  },

  tags: [
    {
      type: String,
      trim: true,
      maxlength: [10, "Tag must be at most 10 characters"],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validator: [validator.isMongoId, "Please provide valid owner"],
  },
  dueDate: {
    type: Date,
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

userSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

userSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});
taskSchema.pre("up", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
