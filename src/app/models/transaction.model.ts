
export class TransactionModel {
  constructor(public pk: number, public amount: number, public direction: number, public user: string, bill: string) {  }

  getTransactionValue(): number {
    let value = this.amount;
    if (this.direction === 1) {
      value = -value;
    }
    return value;
}
}
