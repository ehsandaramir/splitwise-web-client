import {PaymentModel} from './payment.model';
import {DebtModel} from './debt.model';

export class BillModel {
  id: number;
  title: string;
  amount: number;
  creator: number;
  payments: PaymentModel[];
  debts: DebtModel[];


  constructor(id: number, title: string, amount: number, creator: number, payments: PaymentModel[], debts: DebtModel[]) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.creator = creator;
    this.payments = payments;
    this.debts = debts;
  }
}
