import request from "supertest";
import { app } from "../../server";
import { User, UserProps } from "../../models/user.models";
import { Database } from "../../services/databaseClass.service";
import { v4 as uuidv4 } from "uuid";

let database: Database;

beforeAll(async () => {
  database = new Database();
  await database._connect();
});

beforeEach(async () => {
  await User.deleteMany({});
});

// afterAll(async () => {
//   await database._disconnect();
// });

describe("Authentication Controllers", () => {
  describe("POST /api/auth/signup", () => {
    const validUserData: UserProps = {
      id: uuidv4(),
      username: "mica",
      email: "mica@example.com",
      password: "paSsword123",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should create a new user successfully", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .set("username", validUserData.username)
        .set("email", validUserData.email)
        .set("password", validUserData.password)
        .set("role", validUserData.role)
        .set("createdAt", validUserData.createdAt.toISOString())
        .set("updatedAt", validUserData.updatedAt.toISOString());

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(validUserData.email);
      expect(response.body.data.username).toBe(validUserData.username);
      expect(response.body.data.password).not.toBe(validUserData.password);
    });

    it("should return 400 if require fields are missing", async () => {
      const invalidUserData = {
        username: "testuser",
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(invalidUserData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      // expect(response.body.msg).toBe(
      //   "Please provide the appropriate credentials."
      // );
    });

    it("should handle duplicate email registration", async () => {
      await request(app).post("/api/auth/signup").send(validUserData);

      const response = await request(app)
        .post("/api/auth/signup")
        .send(validUserData);

      expect(response.status).toBe(403);
      // expect(response.body.success).toBe(false);
    });
  });
});
