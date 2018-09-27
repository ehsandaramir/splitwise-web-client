
export class TransactionModel {
  public pk: number;
  public amount: number;
  public direction: number;
  public user: number;
  public bill: string;

  constructor(rawData) {
    this.pk = rawData['pk'];
    this.user = parseInt(rawData['user'], 10);
    this.amount = parseFloat(rawData['amount']);
    this.direction = parseInt(rawData['direction'], 10);
    this.bill = rawData['bill'];
  }

  static transactionFactory(rawData): TransactionModel[] {
    const trans = [];
    rawData.forEach((data: {}) => {
      trans.push(new TransactionModel(data));
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
