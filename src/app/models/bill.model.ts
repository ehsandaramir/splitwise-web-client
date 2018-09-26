import {PaymentModel} from './payment.model';
import {DebtModel} from './debt.model';
import {DateVisualClass} from '../helper/date-visual.class';
import {UserModel} from './user.model';
import {TransactionModel} from './transaction.model';

export class BillModel {

  constructor(public pk: number, public title: string, public amount: number, public unit: string, public creator: UserModel,
              public createDate: Date, public transactions: TransactionModel[]) {  }

  getPaymentSum(): number {
    let amount = 0;
    this.transactions.forEach(element => {
      if (element.direction !== 1) {
        amount += Number(element.amount);
      }
      // if (element.getTransactionValue() >= 0) {
      //   amount += element.amount;
      // }
    });
    return amount;
  }

  getPayments(): TransactionModel[] {
    const trans = [];
    this.transactions.forEach(element => {
      if (element.direction !== 1) {
        trans.push(element);
      }
      // if (element.getTransactionValue() >= 0) {
      //   trans.push(element);
      // }
    });
    return trans;
  }

  getDebtSum(): number {
    let amount = 0;
    this.transactions.forEach(element => {
      if (element.direction === 1) {
        amount += Number(element.amount);
      }
    });
    return amount;
  }

  getDebts(): TransactionModel[] {
    const trans = [];
    this.transactions.forEach(element => {
      if (element.direction === 1) {
        trans.push(element);
      }
      // if (element.getTransactionValue() < 0) {
      //   trans.push(element);
      // }
    });
    return trans;
  }

  getVisualDate() {
    const tmp = new DateVisualClass(this.createDate);
    return tmp.getVisualDateTime();
  }
}
