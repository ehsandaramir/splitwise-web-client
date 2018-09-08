import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {BillService} from '../../../../services/bill.service';
import {BillModel} from '../../../../models/bill.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @Input() isActive: boolean;
  @Output() clearActive = new EventEmitter<void>();
  _billId: number;
  currentBill: BillModel;

  constructor(public billService: BillService) {  }

  ngOnInit() {
  }

  @Input()
  set billId(id: number) {
    this._billId = id;
    this.currentBill = this.billService.retrieve(id);
  }

  // @HostListener('click')
  // onBillItemClicked(eventData: Event) {
  //   this.billService.setActiveBill(this._billId);
  // }
}
