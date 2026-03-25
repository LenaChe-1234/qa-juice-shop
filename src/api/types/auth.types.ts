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
