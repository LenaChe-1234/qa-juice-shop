export class Tags {
  static readonly TEST_TYPE = {
    UI: "@ui",
    API: "@api",
    SECURITY: "@security",
    SMOKE: "@smoke",
    REGRESSION: "@regression",
  };

  static readonly FEATURE = {
    AUTH: "@auth",
    SEARCH: "@search",
    BASKET: "@basket",
    PRODUCTS: "@products",
    XSS: "@xss",
    IDOR: "@idor",
    SESSION: "@session",
    HEADERS: "@headers",
    ACCESS_CONTROL: "@access-control",
    INPUT_VALIDATION: "@input-validation",
  };

  static readonly SCENARIO = {
    POSITIVE: "@positive",
    NEGATIVE: "@negative",
  };

  static readonly PRIORITY = {
    CRITICAL: "@critical",
  };

  static getAllTags(): string[] {
    const allTags = {
      ...Tags.FEATURE,
      ...Tags.TEST_TYPE,
      ...Tags.PRIORITY,
      ...Tags.SCENARIO,
    };

    return Object.values(allTags).map((tag) => tag.replace("@", ""));
  }
}
