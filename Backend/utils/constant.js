//
const ROLE = {
  ADMIN: "admin",
  USER: "user",
};
const MODEL = {
  USER_MODEL: "User",
  TASK_MODEL: "Task",
};
const PRIORITY_LEVELS = { LOW: "low", MEDIUM: "medium", HIGH: "high" };

const STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

module.exports = {
  ROLE,
  MODEL,
  PRIORITY_LEVELS,
  STATUS,
};
