// ------------------ Input types ------------------
export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

// ------------------ Auth response type ------------------
export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    roles: string[];
  };
}
