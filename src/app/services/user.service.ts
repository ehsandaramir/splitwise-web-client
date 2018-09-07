import {UserModel} from '../models/user.model';

export class UserService {
  users: UserModel[] = [];

  constructor() {
    const user1 = new UserModel(1, 'Amir', 'Ehsandar', 'ehsan@g.com');
    const user2 = new UserModel(2, 'Gholi', 'Pour', 'gholi@g.com');

    this.users.push(user1);
    this.users.push(user2);
  }

  list() {
    return this.users;
  }

  retrieve(id: number) {
    let target;
    this.users.forEach(element => target = element.id === id ? element : null);
    return target;
  }
}
