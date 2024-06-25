export class User {
  id?: string;
  email?: string;
  profile?: Profile;
  isActive?: boolean;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

class Profile {
  firstName?: string;
  lastName?: string;
  avatar?: string;
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
