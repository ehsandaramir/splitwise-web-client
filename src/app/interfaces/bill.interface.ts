import {UserModel} from '../models/user.model';
import {TransactionModel} from '../models/transaction.model';

export interface BillInterface {
  pk: number;
  title: string;
  amount: number;
  unit: string;
  creator: UserModel;
  create_date: Date;
  transactions: TransactionModel[];
}
