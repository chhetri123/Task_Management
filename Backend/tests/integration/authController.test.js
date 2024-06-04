const request = require("supertest");
const app = require("./../../src/index");
const User = require("./../../src/models/userModel");
const jwt = require("jsonwebtoken");

// Mock the dependencies
jest.mock("./../../src/models/userModel");
jest.mock("jsonwebtoken");

// Create test case for  a new user model with the given username and password
describe("Auth Controller Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/signup", () => {
    it("should sign up a new user", async () => {
      const mockUser = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        password: "password",
        conformPassword: "password",
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);

      const mockToken = "mockToken";
      jwt.sign.mockReturnValue(mockToken);

      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password",
        conformPassword: "password",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.create).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "password",
        conformPassword: "password",
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user).toBeDefined();
      expect(res.body.token).toBe(mockToken);
    });

    it("should return an error if user already exists", async () => {
      User.findOne.mockResolvedValue({});

      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password",
        conformPassword: "password",
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/login", () => {
    it("should log in a user with valid credentials", async () => {
      const mockUser = {
        _id: "user123",
        email: "test@example.com",
        password: "password",
        correctPassword: jest.fn().mockReturnValue(true),
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const mockToken = "mockToken";
      jwt.sign.mockReturnValue(mockToken);

      const res = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "password",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockUser.correctPassword).toHaveBeenCalledWith(
        "password",
        "password"
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: "user123" },
        expect.any(String),
        { expiresIn: expect.any(String) }
      );

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user).toBeDefined();
      expect(res.body.token).toBe(mockToken);
    });

    it("should return an error if credentials are invalid", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Invalid email or password");
    });
  });

  describe("POST /api/logout", () => {
    it("should log out a user", async () => {
      const res = await request(app).get("/api/v1/auth/logout");

      const cookies = res.headers["set-cookie"];

      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain("jwt=loggedout");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
    });
  });
});
