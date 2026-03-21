import "dotenv/config";

export const env = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
};
