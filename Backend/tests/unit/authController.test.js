const authController = require("../../src/controllers/authController");
const User = require("./../../src/models/userModel");
const AppError = require("./../../src/utils/appError");
const jwt = require("jsonwebtoken");
const httpMocks = require("node-mocks-http");

// Import the envConfig
const { jwtExpireAt, jwtSecret } = require("../../src/config/envConfig");

// Mock the dependencies
jest.mock("./../../src/models/userModel");
jest.mock("./../../src/utils/appError");
jest.mock("jsonwebtoken");

describe("Authentication Testing ", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    AppError.mockImplementation((message, statusCode) => {
      return {
        message,
        statusCode,
      };
    });
  });

  describe("login", () => {
    it("should log in a user with valid credentials", async () => {
      const user = {
        _id: "1",
        email: "test@gmail.com",
        password: "password",
        correctPassword: jest.fn().mockReturnValue(true),
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      });

      req.body = { email: "test@gmail.com", password: "password" };
      const token = "mockToken";
      jwt.sign.mockReturnValue(token);
      await authController.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
      expect(user.correctPassword).toHaveBeenCalledWith("password", "password");
      expect(jwt.sign).toHaveBeenCalledWith({ id: "1" }, jwtSecret, {
        expiresIn: jwtExpireAt,
      });

      const responseData = res._getJSONData();
      expect(responseData.status).toBe("success");
      expect(responseData.user).toBeDefined();
      expect(responseData.token).toBe(token);
    });

    //
    it("should return an error if credentials are invalid", async () => {
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      req.body = { email: "test@gmail.com", password: "wrongpassword" };

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invalid email or password",
          statusCode: 200,
        })
      );
    });
  });

  describe("signup", () => {
    it("should sign up a new user", async () => {
      const user = {
        _id: "1",
        name: "Test",
        email: "test@gmail.com",
        password: "password",
        conformPassword: "password",
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(user);

      req.body = {
        name: "Test",
        email: "test@gmail.com",
        password: "password",
        conformPassword: "password",
        role: "user",
      };
      const token = "mockToken";
      jwt.sign.mockReturnValue(token);
      await authController.signup(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(jwt.sign).toHaveBeenCalledWith({ id: "1" }, jwtSecret, {
        expiresIn: jwtExpireAt,
      });

      const responseData = res._getJSONData();
      expect(responseData.status).toBe("success");
      expect(responseData.user).toBeDefined();
      expect(responseData.token).toBe(token);
    });

    it("should return an error if user already exists", async () => {
      User.findOne.mockResolvedValue({});

      req.body = {
        name: "Test",
        email: "test@gmail.com",
        password: "password",
        conformPassword: "password",
      };

      await authController.signup(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User already exists",
          statusCode: 200,
        })
      );
    });
  });
});
