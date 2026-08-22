import type { APIRequestContext, APIResponse } from "@playwright/test";

import type { CreateUserRequest } from "../types/api.types.js";

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  async getUsers(page: number): Promise<APIResponse> {
    return this.request.get("/api/users", {
      params: {
        page,
      },
    });
  }

  async getUser(userId: number): Promise<APIResponse> {
    return this.request.get(`/api/users/${userId}`);
  }

  async createUser(userData: CreateUserRequest): Promise<APIResponse> {
    return this.request.post("/api/users", {
      data: userData,
    });
  }

  async updateUser(
    userId: number,
    userData: CreateUserRequest,
  ): Promise<APIResponse> {
    return this.request.put(`/api/users/${userId}`, {
      data: userData,
    });
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return this.request.delete(`/api/users/${userId}`);
  }
}
