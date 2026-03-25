// import { APIRequestContext, APIResponse } from "@playwright/test";
// import { ApiClient } from "./ApiClient";
// import { register } from "node:module";

// export class AuthApi extends ApiClient {
//   constructor(request: APIRequestContext) {
//     super(request);
//   }

//   /**
//    * Login user and get response (contains token)
//    */
//   async login(email: string, password: string): Promise<APIResponse> {
//     const response = await this.post("/rest/user/login", {
//       email,
//       password,
//     });
//     // Optional: check if OK right here if you don't need to test negative scenarios
//     await this.expectOk(response);
//     return response;
//   }

//   async register(user: any): Promise<APIResponse> {
//     const payload = {
//       email: user.email,
//       password: user.password,
//       passwordRepeat: user.password,
//       securityQuestion: {
//         id: 3,
//         question: "Mother's birth date? (MM/DD/YY)",
//       },
//       securityAnswer: "010101",
//     };

//     const response = await this.post("/api/Users/", payload);
//     await this.expectOk(response);
//     return response;
//   }
// }
