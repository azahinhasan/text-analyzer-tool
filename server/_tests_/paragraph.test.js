const { app, mongoose, server } = require("../index.js"); // Adjust the path as per your project structure
const request = require("supertest");

const text =
  "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

const actions = [
  {
    route: "total-words",
    name: "Total Words",
    value: 16,
  },
  {
    route: "total-characters",
    name: "Total Characters",
    value: 60,
  },
  {
    route: "total-sentences",
    name: "Total Sentences",
    value: 2,
  },
  {
    route: "total-paragraphs",
    name: "Total Paragraphs",
    value: 1,
  },
  {
    route: "longest-words",
    name: "Longest Words",
    value: ["quick", "brown", "jumps", "slept"],
  },
];

describe("Text/paragraph Analysis Endpoints", () => {
  actions.forEach(({ route, name, value }) => {
    it(`should return 200 and ${name.toLowerCase()} number is ${value}`, async () => {
      const endpoint = `/api/text/paragraph-info/${route}?paragraph=${encodeURIComponent(
        text
      )}`;
      const res = await request(app).get(endpoint);
      expect(res.status).toBe(200);
      expect(res.body[route.replace("-", "_")]).toEqual(value);
    });
  });

  afterAll(async () => {
    await server.close();
  });
});
