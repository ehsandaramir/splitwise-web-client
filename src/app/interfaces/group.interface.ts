import {UserModel} from '../models/user.model';
import {BillModel} from '../models/bill.model';

export interface GroupInterface {
  pk: number;
  title: string;
  date_created: Date;
  users: UserModel[];
  bills: BillModel[];
}
