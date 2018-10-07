import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from './data.service';
import {TransactionModel} from '../models/transaction.model';
import {BillModel} from '../models/bill.model';
import {GroupModel} from '../models/group.model';

@Injectable()
export class EditService {
  get group(): GroupModel {
    return this._group;
  }

  set group(value: GroupModel) {
    this._group = value;
  }
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

  private _group: GroupModel;
  private _bill: BillModel;
  private _transaction: TransactionModel;
  private _previousPath: [string];

  constructor(public dataService: DataService, public router: Router) { }

  editGroup(group: GroupModel, currentRoute: [string]) {
    this.group = group;
    this.previousPath = currentRoute;
    this.router.navigate(['/edit', 'group']);
  }

  editGroupFinished() {
    this.editFinished();
  }

  editBill(bill: BillModel, currentRoute: [string]) {
    this.bill = bill;
    this.previousPath = currentRoute;
    this.router.navigate(['/edit', 'bill']);
  }

  editTransaction(bill: BillModel, transaction: TransactionModel, currentRoute: [string]) {
    this.bill = bill;
    this.transaction = transaction;
    this.previousPath = currentRoute;
    this.router.navigate(['/edit', 'transaction']);
  }

  editTransactionFinished() {
    this.editFinished();
  }

  editFinished() {
    this.group = undefined;
    this.bill = undefined;
    this.transaction = undefined;

    this.router.navigate(this.previousPath);
    this.previousPath = ['/'];
  }
}
