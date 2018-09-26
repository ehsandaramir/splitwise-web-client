import {TransactionModel} from './transaction.model';
import {UserModel} from './user.model';

export class BillModel {

  public pk: number;
  public title: string;
  public amount: number;
  public unit: string;
  public creator: UserModel;
  public createDate: Date;
  public transactions: TransactionModel[];

  constructor(rawData: {}) {
    this.pk = rawData['pk'];
    this.title = rawData['title'];
    this.amount = parseFloat(rawData['amount']);
    this.unit = rawData['unit'];
    this.creator = rawData['creator'];
    this.createDate = new Date(rawData['create_date']);
    this.transactions = rawData['transactions'];
  }

  getPaymentSum(): number {
    let amount = 0;
    this.transactions.forEach(element => {
      if (element.direction !== 1) {
        amount += Number(element.amount);
      }
    });
    return amount;
  }

  getPayments(): TransactionModel[] {
    const trans = [];
    this.transactions.forEach(element => {
      if (element.direction !== 1) {
        trans.push(element);
      }
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
    });
    return trans;
  }
}
