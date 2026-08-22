import { test, expect } from "../../fixtures/api.fixture.js";

import type { UsersResponse } from "../../types/api.types.js";

import { newUser } from "../../test-data/api-users.js";

test("returns a list of users", async ({
  usersApi,
}: {
  usersApi: {
    getUsers(page: number): Promise<{
      status(): number;
      ok(): boolean;
      json(): Promise<UsersResponse>;
    }>;
  };
}) => {
  const response = await usersApi.getUsers(2);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody: UsersResponse = await response.json();

  expect(responseBody.page).toBe(2);
  expect(responseBody.data).not.toHaveLength(0);

  for (const user of responseBody.data) {
    expect(user).toMatchObject({
      id: expect.any(Number),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.any(String),
    });

    expect(user.email).toContain("@");
    expect(user.avatar).toMatch(/^https:\/\//);
  }
});
test.describe("Users API", () => {
  test("returns a user by ID using API client", async ({
    usersApi,
  }: {
    usersApi: {
      getUser(id: number): Promise<{
        status(): number;
        json(): Promise<unknown>;
      }>;
    };
  }) => {
    const response = await usersApi.getUser(2);

    expect(response.status()).toBe(200);

    const responseBody = (await response.json()) as { data: { id: number } };

    expect(responseBody.data.id).toBe(2);
  });

  test("returns complete user information", async ({
    usersApi,
  }: {
    usersApi: {
      getUser(id: number): Promise<{
        status(): number;
        ok(): boolean;
        json(): Promise<{
          data: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            avatar: string;
          };
        }>;
        headers(): { [key: string]: string };
      }>;
    };
  }) => {
    const response = await usersApi.getUser(2);

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

  test("returns 404 for a nonexistent user", async ({ usersApi }) => {
    const response = await usersApi.getUser(999);

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    const responseBody = await response.json();

    expect(responseBody).toEqual({});
  });

  test("creates a new user", async ({
    usersApi,
  }: {
    usersApi: {
      createUser(user: typeof newUser): Promise<{
        status(): number;
        json(): Promise<Record<string, unknown>>;
      }>;
    };
  }) => {
    const response = await usersApi.createUser(newUser);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(
      newUser as unknown as Record<string, unknown>,
    );
    expect(responseBody.id).toEqual(expect.any(String));
    expect(responseBody.createdAt).toEqual(expect.any(String));
  });

  test("updates an existing user", async ({
    usersApi,
  }: {
    usersApi: {
      updateUser(
        id: number,
        user: { name: string; job: string },
      ): Promise<{
        status(): number;
        json(): Promise<{
          name: string;
          job: string;
          updatedAt: string;
        }>;
      }>;
    };
  }) => {
    const updatedUser = {
      name: "Denis",
      job: "Senior QA Engineer",
    };

    const response = await usersApi.updateUser(2, updatedUser);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(updatedUser);
    expect(responseBody.updatedAt).toEqual(expect.any(String));

    expect(Number.isNaN(Date.parse(responseBody.updatedAt))).toBeFalsy();
  });

  test("deletes an existing user", async ({ usersApi }) => {
    const response = await usersApi.deleteUser(2);

    expect(response.status()).toBe(204);

    const responseText = await response.text();

    expect(responseText).toBe("");
  });
});
