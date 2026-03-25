import { TestData } from "@src/utils/TestData";
import { users } from "../users";
import { SecurityQuestions } from "../securityQuestions";

export function createTestUser() {
  return {
    email: TestData.getUniqueEmail(),
    password: users.validUser.password,
    securityQuestion: getDefaultSecurityQuestion(),
  };
}

export function getDefaultSecurityQuestion() {
  return {
    id: SecurityQuestions.MOTHERS_BIRTH_DATE.id,
    answer: "010101",
  };
}
