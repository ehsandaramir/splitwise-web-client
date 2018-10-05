import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {GroupModel} from '../../../models/group.model';
import {DataService} from '../../../services/data.service';
import {BillModel} from '../../../models/bill.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public activeBill: number;
  // public bills: BillModel[];
  private Object = Object;

  static trackBillElement(index: number, element: any) {
    return element ? element.pk : null;
  }

  constructor(public dataService: DataService, public ref: ChangeDetectorRef) {
    // this.bills = this.dataService.selectedGroup.bills;
    setInterval(() => { this.ref.markForCheck(); }, 3000);
  }

  ngOnInit() {
  }

  setActiveBill(bill: BillModel) {
    // this.activeBill = bill;
    this.dataService.selectedBill = bill;
  }

  clearActiveBill() {
    // this.activeBill = null;
  }

  onReloadBills() {
    // this.ref.markForCheck();
    // console.log(this.dataService.listGroup());
    // this.bills = this.dataService.selectedGroup.bills;
  }
}
