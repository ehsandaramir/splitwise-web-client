import {UserModel} from './user.model';
import {BillModel} from './bill.model';

export class GroupModel {
  public pk: number;
  public title: string;
  public dateCreated: Date;
  public users: UserModel[];
  public bills: BillModel[];

  constructor(pk: number, title: string, dateCreated: Date, users: UserModel[], bills: BillModel[]) {
    this.pk = pk;
    this.title = title;
    this.dateCreated = dateCreated;
    this.users = users;
    this.bills = bills;
  }

  static groupFactory(fromObject: {}) {
    return new GroupModel(
      fromObject['pk'],
      fromObject['title'],
      new Date(fromObject['date_created']),
      UserModel.userFactoryBatch(fromObject['users']),
      BillModel.billFactoryBatch(fromObject['bills'])
    );
  }

  static groupFactoryBatch(fromArray): GroupModel[] {
    const values = [];
    fromArray.forEach((data: {}) => {
      values.push(this.groupFactory(data));
    });
    return values;
  }
}
