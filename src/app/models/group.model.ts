import {UserModel} from './user.model';
import {BillModel} from './bill.model';

export class GroupModel {

  constructor(public pk: number, public title: string, public users: UserModel[], public bills: BillModel[]) {  }
}
