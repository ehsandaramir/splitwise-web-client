import { Component, OnInit } from '@angular/core';
import {EditService} from '../../services/edit.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {BillModel} from '../../models/bill.model';
import {UserModel} from '../../models/user.model';
import {TransactionModel} from '../../models/transaction.model';


@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {
  public transactionForm: FormGroup;
  public listItemsDirection = [{title: 'Payment', value: '0'}, {title: 'Debt', value: '1'}];
  public listItemsUser: UserModel[];
  public listItemsBill: BillModel[];

  static isFloat(control: FormControl): {[s: string]: boolean} {
    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return {'isNotANumber': true};
    }
    if (value.toString().length !== control.value.length) {
      return {'isNotANumber': true};
    }
  }

  constructor(public dataService: DataService, public editService: EditService) { }

  ngOnInit() {
    this.listItemsUser = this.dataService.listUser();
    this.listItemsBill = this.dataService.listBill();

    this.transactionForm = new FormGroup({
      'bill': new FormControl(this.editService.bill.pk, [Validators.required]),
      'user': new FormControl(this.listItemsUser[0].pk, [Validators.required]),
      'amount': new FormControl('0.0', [Validators.required, TransactionEditComponent.isFloat]),
      'direction': new FormControl('0', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
    // this.dataService.createTransaction(
    //   new TransactionModel
    // );
  }

  onDiscard() {
    console.log('discard');
  }
}
