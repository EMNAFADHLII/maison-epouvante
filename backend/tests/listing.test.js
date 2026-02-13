const request = require("supertest");
const app = require("../src/server");

describe("Health route", () => {
  it("Server should respond", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});
