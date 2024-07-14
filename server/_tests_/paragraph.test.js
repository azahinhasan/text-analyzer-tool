const { app } = require("../index.js"); // Adjust the path as per your project structure
const request = require("supertest");
const getRandomWord = require("../helpers/randomWord");
const text =
  "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";
let token;
let token2;

const actions = [
  {
    route: "total-words",
    name: "Total Words",
    value: 16,
  },
  {
    route: "total-characters",
    name: "Total Characters",
    value: 75,
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

const user1 = {
  email: `${getRandomWord(5)}@test.com`,
  password: "123456",
  full_name: getRandomWord(5),
};
const user2 = {
  email: `${getRandomWord(5)}@test.com`,
  password: "123456",
  full_name: getRandomWord(5),
};

/********Sign in and Sign up*******/
beforeAll(async () => {
  const signup_res = await request(app).post(`/auth/sign-up`).send(user1);
  expect(signup_res.status).toBe(200);

  const signup_res2 = await request(app).post(`/auth/sign-up`).send(user2);
  expect(signup_res2.status).toBe(200);

  const res = await request(app).post(`/auth/sign-in`).send(user1);
  expect(res.status).toBe(200);
  token = res.body.token;

  const res2 = await request(app).post(`/auth/sign-in`).send(user2);
  expect(res2.status).toBe(200);
  token2 = res2.body.token;
});

/********Check analysis info by giving text*******/
describe("Text/paragraph Analysis Endpoints", () => {
  actions.forEach(({ route, name, value }) => {
    it(`should return 200 and ${name.toLowerCase()} number is ${value}`, async () => {
      const endpoint = `/api/text/paragraph-info/${route}?paragraph=${encodeURIComponent(
        text
      )}`;
      const res = await request(app)
        .get(endpoint)
        .set("Content-Type", "application/json")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body[route.replace("-", "_")]).toEqual(value);
    });
  });
});

/********Text APIs*******/
const updatedText = "The quick brown fox jumps over the lazy dog.";
let newTextId_1st_user, newTextId_2nd_user;
describe("Text CRUD Operations", () => {
  it("should create a new text document  (by 1st user)", async () => {
    const res = await request(app)
      .post("/api/text")
      .send({ value: text })
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_characters).toBe(75);
    expect(res.body.data.total_words).toBe(16);

    newTextId_1st_user = res.body.data._id;
  });

  it("should create a new text document (by 2nd user)", async () => {
    const res = await request(app)
      .post("/api/text")
      .send({ value: text })
      .set("Content-Type", "application/json")
      .set("Authorization", token2);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_characters).toBe(75);
    expect(res.body.data.total_words).toBe(16);

    newTextId_2nd_user = res.body.data._id;
  });

  it("should retrieve all text without analysis info", async () => {
    const res = await request(app)
      .get("/api/text")
      .send({ value: text })
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0]).not.toHaveProperty("total_characters");
    expect(res.body.data[1]).not.toHaveProperty("total_words");
  });

  it("should retrieve a specific text document by ID which is created by this user (own text have total words,chars etc info)", async () => {
    const res = await request(app)
      .get(`/api/text/${newTextId_1st_user}`)
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(newTextId_1st_user);
    expect(res.body.data).toHaveProperty("total_characters"); //if not create by this user their not will be total_characters
  });

  it("should retrieve a specific text document by ID which is created by other user (other text donn't have total words,chars etc info)", async () => {
    const res = await request(app)
      .get(`/api/text/${newTextId_1st_user}`)
      .set("Content-Type", "application/json")
      .set("Authorization", token2);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).not.toBe(newTextId_1st_user);
    expect(res.body.data).not.toHaveProperty("total_characters"); //if not create by this user their not will be total_characters
  });

  it("should update a own text document", async () => {
    const res = await request(app)
      .put(`/api/text/${newTextId_1st_user}`)
      .send({ value: updatedText })
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_characters).toBe(44);
    expect(res.body.data.total_words).toBe(9);
  });

  it("should not able to update others text document", async () => {
    const res = await request(app)
      .put(`/api/text/${newTextId_2nd_user}`)
      .send({ value: updatedText })
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should not update a text document without authorization", async () => {
    const res = await request(app)
      .put(`/api/text/${newTextId_1st_user}`)
      .send({ value: updatedText })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should delete a specific text document", async () => {
    const res = await request(app)
      .delete(`/api/text/${newTextId_1st_user}`)
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should verify text document deletion", async () => {
    const res = await request(app)
      .get(`/api/text/${newTextId_1st_user}`)
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No data found");
  });
});
