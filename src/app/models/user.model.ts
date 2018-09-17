
export class UserModel {
  pk: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(pk: number, username: string, firstName: string, lastName: string, email: string) {
    this.pk = pk;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
