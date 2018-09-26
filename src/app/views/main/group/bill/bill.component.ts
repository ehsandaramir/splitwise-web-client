import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {BillModel} from '../../../../models/bill.model';
import {DateVisualClass} from '../../../../helper/date-visual.class';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @Input() isActive: boolean;
  // @Input() currentBill: number;
  @Output() clearActive = new EventEmitter<void>();
  @Output() reloadGroup = new EventEmitter<void>();
  edit = false;
  bill: BillModel;

  constructor(public dataService: DataService) {  }

  ngOnInit() {
  }

  @Input()
  set currentBill(value: number) {
    this.bill = this.dataService.retrieveBill(value);
    console.log(this.bill);
  }

  getCreatedDate(): string {
    const date = new DateVisualClass(this.bill.createDate);
    return date.getVisualDateTime();
  }

  onEditClick() {
    this.edit = true;
  }

  onEditFinish(tag: string) {
    if (tag === 'save' && this.edit) {
      console.log('save bill');
      console.log(this.currentBill);
      this.edit = false;
      this.reloadGroup.emit();
      return;
    }
    if (tag === 'discard' && this.edit) {
      console.log('discard bill');
      console.log(this.currentBill);
      this.edit = false;
      this.reloadGroup.emit();
      return;
    }
    if (tag === 'delete' && !this.edit) {
      console.log('delete bill');
      console.log(this.currentBill);
      this.dataService.deleteBill(this.currentBill);
      this.reloadGroup.emit();
      return;
    }
  }

  // @HostListener('click')
  // onBillItemClicked(eventData: Event) {
  //   this.billService.setActiveBill(this._billId);
  // }
}
