interface AuthData {
  username: string;
  password: string;
  email: string;
  isAdmin?: string;
  firstName: string;
  lastName: string;
}

export type RegisterForm = AuthData & { confirmPassword: string };

export type RegisterResponse = Omit<AuthData, "password"> & {
  id: number;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};
