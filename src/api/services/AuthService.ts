import { APIRequestContext, expect } from "@playwright/test";
import { ApiClient } from "../clients/ApiClient";

export interface RegisterUserPayload {
  email: string;
  password: string;
  securityQuestion?: {
    id: number;
    answer: string;
  };
}

export class AuthService extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async login(email: string, password: string) {
    return this.post("/rest/user/login", {
      data: { email, password },
    });
  }

  async loginAndGetBody(email: string, password: string) {
    const response = await this.login(email, password);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async loginAndGetAuthData(email: string, password: string) {
    const body = await this.loginAndGetBody(email, password);

    return {
      token: body.token ?? body.authentication?.token,
      basketId: body.authentication?.bid,
      email: body.authentication?.umail,
      raw: body,
    };
  }

  async loginNegative(email: string, password: string) {
    return this.post("/rest/user/login", {
      data: { email, password },
    });
  }

  async register(user: RegisterUserPayload) {
    return this.post("/api/Users/", {
      data: {
        email: user.email,
        password: user.password,
        passwordRepeat: user.password,
        securityQuestion: {
          id: user.securityQuestion?.id ?? 1,
        },
        securityAnswer: user.securityQuestion?.answer ?? "test-answer",
      },
    });
  }

  async registerAndLogin(user: RegisterUserPayload) {
    const registerResponse = await this.register(user);

    if (![200, 201].includes(registerResponse.status())) {
      const errorBody = await registerResponse.text();
      throw new Error(
        `User registration failed with status ${registerResponse.status()}: ${errorBody}`,
      );
    }

    return this.loginAndGetAuthData(user.email, user.password);
  }
}
