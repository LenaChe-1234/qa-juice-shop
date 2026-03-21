import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(
    url: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.request.get(url, { headers });
  }

  protected async post(
    url: string,
    data?: unknown,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.request.post(url, {
      data,
      headers,
    });
  }

  protected async expectOk(response: APIResponse): Promise<void> {
    expect(response.ok()).toBeTruthy();
  }
}
