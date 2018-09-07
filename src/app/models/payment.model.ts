
export class PaymentModel {
  user: number;
  amount: number;

  constructor(user: number, amount: number) {
    this.user = user;
    this.amount = amount;
  }
}
