
export class TransactionModel {
  public pk: number;
  public amount: number;
  public direction: number;
  public user: number;
  public bill: string;


  constructor(pk: number, amount: number, direction: number, user: number, bill: string) {
    this.pk = pk;
    this.amount = amount;
    this.direction = direction;
    this.user = user;
    this.bill = bill;
  }

  static transactionFactory(rawData): TransactionModel {
    return new TransactionModel(
      parseInt(rawData['pk'], 10),
      parseFloat(rawData['amount']),
      parseInt(rawData['direction'], 10),
      parseInt(rawData['user__read'], 10),
      rawData['bill__read']
    );
  }

  static transactionFactoryBatch(rawData): TransactionModel[] {
    const trans = [];
    rawData.forEach((data: {}) => {
      trans.push(this.transactionFactory(data));
    });
    return trans;
  }

  getTransactionValue(): number {
    let value = this.amount;
    if (this.direction === 1) {
      value = -value;
    }
    return value;
  }
}
