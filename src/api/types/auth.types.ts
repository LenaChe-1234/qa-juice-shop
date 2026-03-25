export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginAuthentication {
  token: string;
  bid?: number;
  umail?: string;
}

export interface LoginResponse {
  authentication: LoginAuthentication;
  token?: string;
}

export interface WhoAmIResponse {
  user?: {
    id: number;
    email: string;
  };
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  passwordRepeat: string;
  securityQuestion?: {
    id: number;
    question: string;
  };
  securityAnswer: string;
}

export enam RegisterQuestions {
    SIBLING_NAME ="Your eldest siblings middle name?",
MOTHER_MIDL_ENAME = "Mother's maiden name?",
MOTHER_BTD = "Mother's birth date? (MM/DD/YY)",
"Father's birth date? (MM/DD/YY)",
"Maternal grandmother's first name?",
"Paternal grandmother's first name?",
"Name of your favorite pet?",
"Last name of dentist when you were a teenager? (Do not include 'Dr.')",
"Your ZIP/postal code when you were a teenager?",
"Company you first work for as an adult?",
"Your favorite book?",
"Your favorite movie?",
"Number of one of your customer or ID cards?",
"What's your favorite place to go hiking?",
}
