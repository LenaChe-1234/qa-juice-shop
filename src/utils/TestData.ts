export class TestData {
  static getUniqueEmail(prefix: string = "demo+qa"): string {
    return `${prefix}${Date.now()}@example.com`;
  }
}
