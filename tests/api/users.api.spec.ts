import { test, expect } from "../../fixtures/api.fixture.js";

test.describe("Users API", () => {
  test("returns a user by ID using API client", async ({ usersApi }) => {
    const response = await usersApi.getUser(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data.id).toBe(2);
  });

  test("returns complete user information", async ({ request }) => {
    const response = await request.get("/api/users/2");

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.data).toMatchObject({
      id: 2,
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.any(String),
    });

    expect(responseBody.data.email).toContain("@");
    expect(responseBody.data.avatar).toMatch(/^https:\/\//);

    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("returns 404 for a nonexistent user", async ({ request }) => {
    const response = await request.get("/api/users/999");

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    const responseBody = await response.json();

    expect(responseBody).toEqual({});
  });

  test("creates a new user", async ({ request }) => {
    const userData = {
      name: "Denis",
      job: "QA Engineer",
    };

    const response = await request.post("/api/users", {
      data: userData,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(userData);
    expect(responseBody.id).toEqual(expect.any(String));
    expect(responseBody.createdAt).toEqual(expect.any(String));
  });

  test("updates an existing user", async ({ request }) => {
    const updatedUser = {
      name: "Denis",
      job: "Senior QA Engineer",
    };

    const response = await request.put("/api/users/2", {
      data: updatedUser,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(updatedUser);
    expect(responseBody.updatedAt).toEqual(expect.any(String));

    expect(Number.isNaN(Date.parse(responseBody.updatedAt))).toBeFalsy();
  });

  test("deletes an existing user", async ({ request }) => {
    const response = await request.delete("/api/users/2");

    expect(response.status()).toBe(204);

    const responseText = await response.text();

    expect(responseText).toBe("");
  });
});
