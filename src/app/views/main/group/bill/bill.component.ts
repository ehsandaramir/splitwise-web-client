import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {BillModel} from '../../../../models/bill.model';
import {DataService} from '../../../../services/data.service';
import {EditService} from '../../../../services/edit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @Input() isActive: boolean;
  @Output() clearActive = new EventEmitter<void>();
  @Output() reloadGroup = new EventEmitter<void>();
  edit = false;
  bill: BillModel;

  constructor(public dataService: DataService, private editService: EditService) {  }

  ngOnInit() {
  }

  @Input()
  set currentBill(value: number) {
    this.bill = this.dataService.retrieveBill(value);
  }

  onEditClick() {
    this.edit = true;
  }

  onEditFinish(tag: string) {
    if (tag === 'save' && this.edit) {
      console.log('save bill');
      console.log(this.bill);
      this.edit = false;
      this.reloadGroup.emit();
      return;
    }
    if (tag === 'discard' && this.edit) {
      console.log('discard bill');
      console.log(this.bill);
      this.edit = false;
      this.reloadGroup.emit();
      return;
    }
    if (tag === 'delete' && !this.edit) {
      console.log('delete bill');
      console.log(this.bill);
      this.dataService.deleteBill(this.bill.pk);
      this.reloadGroup.emit();
      return;
    }
  }

  onAddPayment() {
    this.editService.editTransaction(this.bill, undefined, ['/']);
  }

  onAddDebt() {
    console.log('add debt');
  }

  onDeletePayment(pk: number) {
    console.log('delete payment: ' + pk);
  }

  onDeleteDebt(pk: number) {
    console.log('delete debt: ' + pk);
  }

  // @HostListener('click')
  // onBillItemClicked(eventData: Event) {
  //   this.billService.setActiveBill(this._billId);
  // }
}
