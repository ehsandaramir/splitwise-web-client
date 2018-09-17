import {UserModel} from '../models/user.model';

export class UserService {
  users: {} = {};
  public selectedUser: UserModel;

  constructor() {
    const user1 = new UserModel(1, 'ehsandaramir', 'Amir', 'Ehsandar', 'ehsan@g.com');
    const user2 = new UserModel(2, 'gholipour', 'Gholi', 'Pour', 'gholi@g.com');
    this.users[user1.pk] = user1;
    this.users[user2.pk] = user2;
  }

  list() {
    return Object.values(this.users);
  }

  create(user: UserModel) {
    if (user.pk in this.users) {
      console.error('creating an existing user!');
      console.error(user);
      return;
    }
    this.users[user.pk] = user;
  }

  retrieve(id: number) {
    return this.users[id];
  }

  update(user: UserModel) {
    if (!(user.pk in this.users)) {
      console.error('updating non-exist element');
      console.error(user);
      return;
    }
    this.users[user.pk] = user;
  }

  delete(id: number) {
    if (!(id in this.users)) {
      console.error('deleting non-exist element: ' + id);
      return;
    }
    delete this.users[id];
  }
}
