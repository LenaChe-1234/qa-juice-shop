export const users = {
  validUser: {
    password: "Test1234!",
    securityQuestion: {
      id: 1,
      answer: "test-answer",
    },
  },

  invalidUser: {
    email: "invalid-user@example.com",
    password: "wrong-password",
  },

  demoUser: {
    email: "demo@juice-sh.op",
    password: "demo123",
  },
} as const;
