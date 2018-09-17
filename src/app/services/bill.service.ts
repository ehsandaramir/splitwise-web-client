import {BillModel} from '../models/bill.model';
import {PaymentModel} from '../models/payment.model';
import {DebtModel} from '../models/debt.model';

export class BillService {
  private bills: {} = {};

  constructor() {
    console.log('bill service instance');

    const bill1 = new BillModel(1, 'Dinner', 1.23, '$', 1, new Date(), [
      new PaymentModel(1, 1.23),
    ], [
      new DebtModel(2, 1.03),
      new DebtModel(1, 0.20),
    ]);
    const bill2 = new BillModel(2, 'Launch', 12.34, '$', 1, new Date(), [
      new PaymentModel(2, 12),
      new PaymentModel(1, 0.34)
    ], [
      new DebtModel(1, 12.34)
    ]);

    this.bills[bill1.pk] = bill1;
    this.bills[bill2.pk] = bill2;
  }

  list(): BillModel[] {
    const target = [];
    for (const key in this.bills) {
      if (this.bills.hasOwnProperty(key)) { continue; }
      target.push(this.bills[key]);
    }
    return target;
  }

  create(bill: BillModel): void {
    if (bill.pk in this.bills) {
      console.error('creating an existing bill!');
      console.error(bill);
      return;
    }
    this.bills[bill.pk] = bill;
  }

  retrieve(id: number): BillModel {
    return this.bills[id];
  }

  update(bill: BillModel): void {
    if (!(bill.pk in this.bills)) {
      console.error('updating non-exist element');
      console.error(bill);
      return;
    }
    this.bills[bill.pk] = bill;
  }

  delete(id: number): void {
    if (!(id in this.bills)) {
      console.error('deleting non-exist element: ' + id);
      return;
    }
    delete this.bills[id];
  }

}
