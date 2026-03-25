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

  static join(...tags: Array<string | undefined | false>): string {
    return tags.filter(Boolean).join(" ");
  }
}
