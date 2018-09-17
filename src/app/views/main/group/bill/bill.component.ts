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
  @Output() clearActive = new EventEmitter<void>();
  @Output() reloadGroup = new EventEmitter<void>();
  _billId: number;
  currentBill: BillModel;
  edit = false;

  constructor(public dataService: DataService) {  }

  ngOnInit() {
  }

  @Input()
  set billId(id: number) {
    this._billId = id;
    this.currentBill = this.dataService.retrieveBill(id);
  }

  getCreatedDate(): string {
    const date = new DateVisualClass(this.currentBill.dateCreated);
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
      this.dataService.deleteBill(this.currentBill.pk);
      this.reloadGroup.emit();
      return;
    }
  }

  // @HostListener('click')
  // onBillItemClicked(eventData: Event) {
  //   this.billService.setActiveBill(this._billId);
  // }
}
