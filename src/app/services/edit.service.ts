import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from './data.service';
import {TransactionModel} from '../models/transaction.model';
import {BillModel} from '../models/bill.model';

@Injectable()
export class EditService {
  get bill(): BillModel {
    return this._bill;
  }

  set bill(value: BillModel) {
    this._bill = value;
  }
  get transaction(): TransactionModel {
    return this._transaction;
  }

  set transaction(value: TransactionModel) {
    this._transaction = value;
  }

  get previousPath(): [string] {
    return this._previousPath;
  }

  set previousPath(value: [string]) {
    this._previousPath = value;
  }

  private _bill: BillModel;
  private _transaction: TransactionModel;
  private _previousPath: [string];

  constructor(public dataService: DataService, public router: Router) { }

  editTransaction(bill: BillModel, transaction: TransactionModel, currentRoute: [string]) {
    this.bill = bill;
    this.transaction = transaction;
    this.previousPath = currentRoute;
    this.router.navigate(['/edit', 'transaction']);
  }

  editTransactionFinished() {
    this.router.navigate(this.previousPath);
  }
}
