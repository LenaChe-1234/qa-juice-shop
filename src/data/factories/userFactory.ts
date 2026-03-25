import { users } from "@src/data/users";
import { TestData } from "@src/utils/TestData";
import { SecurityQuestions } from "@src/data/securityQuestions";

export interface TestUser {
  email: string;
  password: string;
  securityQuestion: {
    id: number;
    answer: string;
  };
}

export function createTestUser(overrides?: Partial<TestUser>): TestUser {
  return {
    email: TestData.getUniqueEmail(),
    password: users.validUser.password,
    securityQuestion: {
      id: SecurityQuestions.MOTHERS_BIRTH_DATE.id,
      answer: "010101",
    },
    ...overrides,
  };
}
