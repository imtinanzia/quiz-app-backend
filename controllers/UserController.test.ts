// Import necessary modules and setup your app
import express, { Application, Request, Response } from "express";
import request from "supertest";
import UserRoutes from "../routes/UserRoutes";
import connectDB from "../config/db";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use("/api/auth", UserRoutes);

  return app;
}
const app = createServer();

// Define a test user's data (you can customize this)
const testUser = {
  email: "test@gmail.com",
  fullName: "test",
  password: "12345678",
};

let authToken = ""; // This will store the authentication token for the user

// Start the tests
describe("User Controller Test Cases", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    // console.log("Response register=>",response.status,response.error)
  });
  // Test the login route
  it("should login a user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    // console.log("response login=>", response.status,response.error,response.body);
    authToken = response.body.user.token;
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("token");
  });

  // Test the Register route
  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        ...testUser,
        email: "test" + Math.floor(Math.random() * 100000) + 1 + "@gmail.com",
      });
    console.log(
      "response register=>",
      response.status,
      response.error,
      response.body
    );
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("token");
  });

  // Test the getAll route (requires authentication)
  it("should get all users when authenticated", async () => {
    const response = await request(app)
      .get("/api/auth")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.users).toBeDefined();
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  // Test the getAllCountries route (requires authentication)
  it("should get all countries when authenticated", async () => {
    const response = await request(app)
      .get("/api/auth/countries")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.countries).toBeDefined();
    expect(Array.isArray(response.body.countries)).toBe(true);
  });
});
