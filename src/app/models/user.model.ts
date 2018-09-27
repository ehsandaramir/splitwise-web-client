
export class UserModel {
  pk: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  billGroups: [string];

  constructor(pk: number, username: string, firstName: string, lastName: string, email: string, billGroups: [string]) {
    this.pk = pk;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.billGroups = billGroups;
  }

  static userFactory(fromObject: {}): UserModel {
    return new UserModel(
      parseInt(fromObject['pk'], 10),
      fromObject['username'],
      fromObject['first_name'],
      fromObject['last_name'],
      fromObject['email'],
      fromObject['bill_groups']
    );
  }

  static userFactoryBatch(fromArray): UserModel[] {
    const values = [];
    fromArray.forEach((data: {}) => {
      values.push(this.userFactory(data));
    });
    return values;
  }
}
