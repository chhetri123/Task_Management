const request = require("supertest");
const app = require("./../../src/index");
const Task = require("./../../src/models/taskModel");
const User = require("./../../src/models/userModel");

const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpireAt } = require("../../src/config/envConfig");

// Mock the dependencies
jest.mock("./../../src/models/taskModel");
jest.mock("./../../src/models/userModel");

describe("Task Controller Integration Tests", () => {
  let userToken, adminToken;

  beforeAll(() => {
    userToken = jwt.sign({ id: "6658b1c45cae4ef2d8681198" }, jwtSecret, {
      expiresIn: jwtExpireAt,
    });
    adminToken = jwt.sign({ id: "6658b1c45cae4ef2d8681199" }, jwtSecret, {
      expiresIn: jwtExpireAt,
    });
  });

  describe("POST /api/v1/tasks", () => {
    it("should create a task for a user", async () => {
      const mockTask = {
        title: "task test",
        description: "test description",
        status: "open",
        priority: "high",
        tags: ["test"],
        dueDate: "2025-12-31",
        owner: "6658b1c45cae4ef2d8681198",
      };

      Task.create.mockResolvedValue(mockTask);
      User.findById.mockResolvedValue({
        id: "6658b1c45cae4ef2d8681198",
        role: "user",
      });

      const res = await request(app)
        .post("/api/v1/tasks")
        .set("Authorization", `Bearer ${userToken}`) // mock token for user
        .send({
          title: "task test",
          description: "test description",
          status: "open",
          priority: "high",
          tags: ["test"],
          dueDate: "2025-12-31",
        });

      expect(Task.create).toHaveBeenCalledWith({
        title: "task test",
        description: "test description",
        status: "open",
        priority: "high",
        tags: ["test"],
        dueDate: "2025-12-31",
        owner: "6658b1c45cae4ef2d8681198",
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.task).toBeDefined();
      expect(res.body.task.title).toBe("task test");
    });

    it("should not allow admin to create a task (Authorization)", async () => {
      User.findById.mockResolvedValue({
        id: "6658b1c45cae4ef2d8681199",
        role: "admin",
      });

      const res = await request(app)
        .post("/api/v1/tasks")
        .set("Authorization", `Bearer ${adminToken}`) // mock token for admin
        .send({
          title: "task test",
          description: "test description",
          status: "open",
          priority: "high",
          tags: ["test"],
          dueDate: "2025-12-31",
          owner: "user123",
        });

      expect(res.status).toBe(403);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe(
        "You do not have permission to do this action"
      );
    });
  });
});
