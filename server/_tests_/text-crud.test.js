const { app, mongoose, server } = require("../index.js"); // Adjust the path as per your project structure
const request = require("supertest");

const text =
  "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";
const updatedText = "The quick brown fox jumps over the lazy dog.";
let newTextId;

describe("Text CRUD Operations", () => {
  it("should create a new text document", async () => {
    const res = await request(app).post("/api/text").send({ value: text });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_characters).toBe(60);
    expect(res.body.data.total_words).toBe(16);

    newTextId = res.body.data._id;
  });

  it("should retrieve a specific text document by ID", async () => {
    const res = await request(app).get(`/api/text/${newTextId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(newTextId);
  });

  it("should update a specific text document", async () => {
    const res = await request(app)
      .put(`/api/text/${newTextId}`)
      .send({ value: updatedText });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_characters).toBe(36);
    expect(res.body.data.total_words).toBe(9);
  });

  it("should delete a specific text document", async () => {
    const res = await request(app).delete(`/api/text/${newTextId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should verify text document deletion", async () => {
    const res = await request(app).get(`/api/text/${newTextId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No data found");
  });

  afterAll(async () => {
    await server.close();
  });
});
