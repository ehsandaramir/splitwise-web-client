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

  constructor(pk: number, title: string, amount: number, unit: string,
              creator: UserModel, createDate: Date, transactions: TransactionModel[]) {
    this.pk = pk;
    this.title = title;
    this.amount = amount;
    this.unit = unit;
    this.creator = creator;
    this.createDate = createDate;
    this.transactions = transactions;
  }

  static billFactory(fromObject: {}): BillModel {
    return new BillModel(
      fromObject['pk'],
      fromObject['title'],
      parseFloat(fromObject['amount']),
      fromObject['unit'],
      UserModel.userFactory(fromObject['creator']),
      new Date(fromObject['create_date']),
      TransactionModel.transactionFactory(fromObject['transactions'])
    );
  }

  static billFactoryBatch(fromArray): BillModel[] {
    const values = [];
    fromArray.forEach((data: {}) => {
      values.push(this.billFactory(data));
    });
    return values;
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
