import {BillModel} from '../models/bill.model';
import {PaymentModel} from '../models/payment.model';
import {DebtModel} from '../models/debt.model';

export class BillService {
  private bills: {} = {};

  constructor() {
    const bill1 = new BillModel(1, 'Dinner', 1.23, 1, [
      new PaymentModel(1, 1.23),
    ], [
      new DebtModel(2, 1.03),
      new DebtModel(1, 0.20),
    ]);
    const bill2 = new BillModel(2, 'Dinner', 12.34, 1, [
      new PaymentModel(2, 12),
      new PaymentModel(1, 0.34)
    ], [
      new DebtModel(1, 12.34)
    ]);

    this.bills[bill1.id] = bill1;
    this.bills[bill2.id] = bill2;
  }

  list() {
    const target = [];
    for (const key in this.bills) {
      if (this.bills.hasOwnProperty(key)) { continue; }
      target.push(this.bills[key]);
    }
    return target;
  }

  retrieve(id: number) {
    return this.bills[id];
  }
}
