// import "dotenv/config";

// export const env = {
//   baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
// };
import "dotenv/config";

function toBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  return value === "true";
}

export const env = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  startWebServer: toBoolean(process.env.START_WEB_SERVER, false),
  ci: toBoolean(process.env.CI, false),
};
