export class User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email?: string;
}

export interface ResponseLogin {
  active?: boolean;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  role?: string;
  token: string;
}
