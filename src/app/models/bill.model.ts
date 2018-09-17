import {PaymentModel} from './payment.model';
import {DebtModel} from './debt.model';
import {DateVisualClass} from '../helper/date-visual.class';

export class BillModel {
  pk: number;
  title: string;
  amount: number;
  unit: string;
  creator: number;
  dateCreated: Date;
  payments: PaymentModel[];
  debts: DebtModel[];

  constructor(pk: number, title: string, amount: number, unit: string, creator: number,
              dateCreated: Date, payments: PaymentModel[], debts: DebtModel[]) {
    this.pk = pk;
    this.title = title;
    this.amount = amount;
    this.unit = unit;
    this.creator = creator;
    this.dateCreated = dateCreated;
    this.payments = payments;
    this.debts = debts;
  }

  getPaymentSum() {
    let amount = 0;
    this.payments.forEach(element => amount += element.amount);
    return amount;
  }

  getDebtSum() {
    let amount = 0;
    this.debts.forEach(element => amount += element.amount);
    return amount;
  }
}
