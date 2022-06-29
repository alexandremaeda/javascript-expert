const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("Api Suite test", () => {
  describe("/contact", () => {
    it("shold request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/contact", () => {
    it("shold request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "hello world");
    });
  });

  describe("/login", () => {
    it("shold login sucessfully on the login route and return status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "maeda",
          password: "123",
        })
        .expect(200);

      assert.deepStrictEqual(response.text, "login has succeeded");
    });

    it("shold unauthorized a request when requesting it using wrong credendials and return status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "xan",
          password: "321",
        })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "login failded");
    });
  });
});
