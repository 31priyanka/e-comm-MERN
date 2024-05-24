const request = require("supertest");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());

// Mock the DB connection
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/test_db`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the DB after each test
afterEach(async () => {
  await User.deleteMany();
});

// Close the DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

describe("User Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("email", "test@example.com");
    expect(res.body).not.toHaveProperty("password");
  });

  it("should login an existing user", async () => {
    // First, register the user
    await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
    });

    // Then, login with the same user
    const res = await request(app).post("/login").send({
      email: "test@example.com",
      password: "test123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("email", "test@example.com");
    expect(res.body).not.toHaveProperty("password");
  });

  it("should not login with incorrect credentials", async () => {
    const res = await request(app).post("/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result", "No User Found");
  });
});
