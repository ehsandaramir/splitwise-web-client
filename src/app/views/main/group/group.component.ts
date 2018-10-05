import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {BillModel} from '../../../models/bill.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private Object = Object;

  constructor(public dataService: DataService, public ref: ChangeDetectorRef) {
    setInterval(() => { this.ref.markForCheck(); }, 3000);
  }

  ngOnInit() {
  }

  setActiveBill(bill: BillModel) {
    this.dataService.selectedBill = bill;
  }

  onReloadBills() {
  }

  // TODO: add new bill
  // TODO: edit group on main page
}
