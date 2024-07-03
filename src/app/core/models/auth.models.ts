export class User {
  id!: string;
  email!: string;
  profile!: Profile;
  isActive!: boolean;
  roles!: string[];
  createdAt!: Date;
  updatedAt!: Date;
  password!: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    avatar: string
  ) {
    this.email = email;
    this.profile = new Profile(firstName, lastName, avatar);
    this.password = password;
  }
}

class Profile {
  firstName!: string;
  lastName!: string;
  avatar!: string;

  constructor(firstName: string, lastName: string, avatar: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
  }
}
